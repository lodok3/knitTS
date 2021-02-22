import { KnitServer, Service } from "init";
import { Loader } from "Util/Loader";
import { RemoteProperty } from "Util/Remote/RemoteProperty";
import { RemoteSignal } from "Util/Remote/RemoteSignal";
import { Ser } from "Util/Ser";
import { TableUtil } from "Util/TableUtil";
import { Thread } from "Util/Thread";

let started = false;
let startedComplete = false;
const onStartedComplete = new Instance("BindableEvent");

const knitRepServiceFolder = new Instance("Folder");
knitRepServiceFolder.Name = "Services"

function createRepFolder(serviceName: string): Folder {
    const folder = new Instance("Folder");
    folder.Name = serviceName;
    return folder;
}

function getFolderOrCreate(parent: Instance | undefined, name: string): Folder | undefined {
    if (!parent) {
        return
    }
    let f = parent.FindFirstChild(name);
    if (!f) {
        f = new Instance("Folder");
        f.Name = name;
        f.Parent = parent;
    }
    return f as Folder;
}

function getSmallName(name: string): string {
    switch (name) {
        case "RemoteFunction":
            return "RF"
        case "RemoteEvent":
            return "RE"
        case "ValueBase":
            return "RP"
        default:
            return ""
    }
}

type RemoteObject = RemoteFunction | RemoteEvent | ValueBase

function addRepToFolder(service: Service, remoteObj: RemoteObject, folderOverride?: string): void {
    let newParent 
    const replicationFolder = service._knit_rep_folder
    if (folderOverride) {
        newParent = getFolderOrCreate(replicationFolder, folderOverride)
    } else {
        const smallName = getSmallName(remoteObj.ClassName)
        if (smallName) {
            newParent = getFolderOrCreate(replicationFolder, smallName)
        }
    }
}

const server: KnitServer = {
    services: new Map<string, Service>(),

    isService(object: object): boolean {
        return ("_knit_is_service" in object);
    },

    createService(service: Service): Service {
        assert(service.name && service.name.size() > 0, "Service must have a non-empty string as a name.")
        assert(this.services.get(service.name) === undefined, "Service already exists.")
        TableUtil.Extend(service, {
            _knit_is_service: true,
            _knit_rf: {},
            _knit_re: {},
            _knit_rp: {},
            _knit_rep_folder: createRepFolder(service.name)
        })
        if (!service.client) {
            service.client = new Map<string, unknown>();
            service.client.set("server", service)
        } else {
            if (service.client.get("server") !== service) {
                service.client.set("server", service)
            }
        }
        this.services.set(service.name, service)
        return service
    },

    addServices(folder: Folder) {
        return Loader.LoadChildren(folder)
    },

    addServicesDeep(folder: Folder) {
        return Loader.LoadDescendants(folder)
    },

    bindRemoteEvent(service: Service, eventName: string, remoteEvent: RemoteSignal): void {
        assert(service._knit_re?.get(eventName), `RemoteEvent ${eventName} already exists`)
        const re = remoteEvent._remote
        re.Name = eventName
        service._knit_re?.set(eventName, re)
        addRepToFolder(service, re)
    },

    bindRemoteFunction(service: Service, funcName: string, func: (...args: unknown[]) => unknown[]): void {
        assert(service._knit_rf?.get(funcName), `RemoteFunction ${funcName} already exists`)
        const rf = new Instance("RemoteFunction");
        rf.Name = funcName;
        service._knit_rf?.set(funcName, rf);
        addRepToFolder(service, rf);
        rf.OnServerInvoke = (...args: unknown[]) => {
            return Ser.SerializeArgsAndUnpack(func(service.client, Ser.DeserializeArgsAndUnpack(...args)))
        }
    },

    bindRemoteProperty(service: Service, propName: string, prop: RemoteProperty<unknown>) {
        assert(service._knit_rp?.get(propName), `RemoteProperty ${propName} already exists`)
        prop._object.Name = propName
        service._knit_rp?.set(propName, prop)
        addRepToFolder(service, prop._object as ValueBase, "RP")
    },

    async start() {
        if (started) {
            return Promise.reject("Knit already started")
        }

        started = true;
        const services = this.services;

        return new Promise((resolve) => {
            services.forEach(service => {
                if (!service.client) {
                    return
                }
                service.client.forEach((item, key) => {
                    if (typeOf(item) === "function") {
                        this.bindRemoteFunction(service, key, item as (...args: any[]) => unknown[])
                    } else if (RemoteSignal.Is(item)) {
                        this.bindRemoteEvent(service, key, item as RemoteSignal)
                    } else if (RemoteProperty.Is(item)) {
                        this.bindRemoteProperty(service, key, item as RemoteProperty<unknown>)
                    } else {
                        warn("Found Signal instead of RemoteSignal")
                    }
                })
            })

            const promisesInitServices: Promise<unknown>[] = []
            services.forEach(service => {
                if (service.knitInit && typeOf(service.knitInit) === () => se) {
                    promisesInitServices.push(new Promise((resolve) => {
                        resolve(service.knitInit())
                    }))
                }
            })

            resolve(Promise.all(promisesInitServices))
        }).then(() => {

            services.forEach(service => {
                if (service.knitStart && typeOf(service.knitStart) === "function") {
                    Thread.SpawnNow(service.knitStart, service)
                }
            })

            startedComplete = true;
            onStartedComplete.Fire();

            Thread.Spawn(() => {
                onStartedComplete.Destroy()
            })

            knitRepServiceFolder.Parent = script.Parent
        })
    },

    onStart() {
        if (startedComplete) {
            return Promise.resolve(true);
        } else {
            return new Promise((resolve) => {
                if (startedComplete) {
                    resolve(true);
                    return
                }
                onStartedComplete.Event.Wait();
                resolve(true);
            })
        }
    }
}

export default server;