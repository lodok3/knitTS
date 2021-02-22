import { Players } from "@rbxts/services"
import { KnitClient, Controller, ServiceMirror, GameModule } from "init";
import { Loader } from "Util/Loader";
import { ClientRemoteProperty } from "Util/Remote/ClientRemoteProperty";
import { ClientRemoteSignal } from "Util/Remote/ClientRemoteSignal";
import { Ser } from "Util/Ser";
import { TableUtil } from "Util/TableUtil";
import { Thread } from "../src/Util/Thread";

const services = new Map<any, ServiceMirror>();
const servicesFolder = script.Parent?.WaitForChild("Services")

let started = false;
let startedComplete = false;
const onStartedComplete = new Instance("BindableEvent");

function buildService(serviceName: string, folder: Folder): ServiceMirror {
    const service: ServiceMirror = new Map<any, any>();
    if (folder.FindFirstChild("RF")) {
        folder.FindFirstChild("RF")?.GetChildren().forEach(remoteFunction => {
            if (remoteFunction.IsA("RemoteFunction")) {
                service.set(remoteFunction.Name, (...args: unknown[]) => {
                    return Ser.DeserializeArgsAndUnpack(remoteFunction.InvokeServer(Ser.SerializeArgsAndUnpack(...args)))
                })
                service.set(remoteFunction.Name + "Promise", (...args: unknown[]) => {
                    const serializedArgs = Ser.SerializeArgs(...args)
                    return new Promise((resolve) => {
                        resolve(Ser.DeserializeArgsAndUnpack(remoteFunction.InvokeServer(...serializedArgs)))
                    })
                })
            }
        });
    }
    if (folder.FindFirstChild("RE")) {
        folder.FindFirstChild("RE")?.GetChildren().forEach(remoteEvent => {
            if (remoteEvent.IsA("RemoteEvent")) {
                service.set(remoteEvent.Name, new ClientRemoteSignal(remoteEvent))
            }
        })
    }
    if (folder.FindFirstChild("RP")) {
        folder.FindFirstChild("RP")?.GetChildren().forEach(remoteProperty => {
            if (remoteProperty.IsA("ValueBase") || remoteProperty.IsA("RemoteEvent")) {
                service.set(remoteProperty.Name, new ClientRemoteProperty(remoteProperty))
            }
        })
    }
    services.set(serviceName, service)
    return service
}

const client: KnitClient = {
    controllers: new Map<string, Controller>(),
    player: Players.LocalPlayer,

    createController(controller: Controller) {
        assert(controller.name && controller.name.size() > 0, "Controller must have a non-empty string as a name.")
        assert(this.controllers.get(controller.name) === undefined, "Controller already exists.")
        TableUtil.Extend(controller, {
            _knit_is_controller: true
        })
        this.controllers.set(controller.name, controller)
        return controller
    },

    addControllers(folder: Folder) {
        return Loader.LoadChildren(folder)
    },

    addControllersDeep(folder: Folder) {
        return Loader.LoadDescendants(folder)
    },

    getService(serviceName: string) {
        const folder = servicesFolder?.FindFirstChild(serviceName)
        assert(folder, `Could not find service ${serviceName}`)
        return services.get(serviceName) || buildService(serviceName, folder as Folder)
    },

    getController(controllerName: string) {
        return this.controllers.get(controllerName)
    },

    async start() {
        if (started) {
            return Promise.reject("Knit is already started")
        }

        started = true;
        const controllers = this.controllers
        return new Promise(resolve => {
            const promisesStartControllers: Promise<unknown>[] = [];
            controllers.forEach(controller => {
                if (controller.knitInit && typeOf(controller.knitInit) === "function") {
                    promisesStartControllers.push(new Promise(resolve_1 => {
                        resolve_1(controller.knitInit());
                    }));
                }
            });

            resolve(Promise.all(promisesStartControllers));
        }).then(() => {
            controllers.forEach(controller_1 => {
                if (controller_1.knitStart && typeOf(controller_1.knitStart) === "function") {
                    Thread.SpawnNow(controller_1.knitStart);
                }
            });
            startedComplete = true;
            onStartedComplete.Fire();
            Thread.Spawn(() => {
                onStartedComplete.Destroy();
            });
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
                onStartedComplete.Event.Wait()
                resolve(true);
            })
        }
    }
}

export default client