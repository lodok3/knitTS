import { ClientRemoteProperty } from "Util/Remote/ClientRemoteProperty";
import { ClientRemoteSignal } from "Util/Remote/ClientRemoteSignal";
import { Signal } from "Util/Signal";
import { TableUtil } from "Util/TableUtil";
import { Thread } from "Util/Thread";

declare interface GameModule {
    Name: string;
    KnitInit?: () => void;
    KnitStart?: () => void;
}

declare interface Controller extends GameModule {}
declare interface Service extends GameModule {
    Client: unknown;
}

type Util = {
    TableUtil: TableUtil;
    Signal: typeof Signal;
    Thread: Thread
};

declare interface ServiceMirror {
    [key: string]: ClientRemoteSignal | ClientRemoteProperty | ((...args: unknown[]) => unknown);
}

declare namespace Knit {
    abstract class KnitClient {
        static CreateController: (controller: Controller) => Controller;
        static AddControllers: (folder: Folder) => Controller[];
        static AddControllersDeep: (folder: Folder) => Controller[];
        static GetService: (serviceName: string) => ServiceMirror;
        static GetController: (controller: Controller) => Controller;
        static Start: () => void;
        static OnStart: Promise<null>;
    }

    abstract class KnitServer {
        static IsService: (object: object) => boolean;
        static CreateService: (service: Service) => Service;
        static AddServices: (folder: Folder) => Service[];
        static AddServicesDeep: (folder: Folder) => Service[];
        static Start: () => void;
        static OnStart: Promise<null>;
    }

    const Util: Util
}
export = Knit;