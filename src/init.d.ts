import { ClientRemoteProperty } from "Util/Remote/ClientRemoteProperty";
import { ClientRemoteSignal } from "Util/Remote/ClientRemoteSignal";

/// <reference types="Util/Signal.d.ts" />
/// <reference types="Util/TableUtil.d.ts" />
/// <reference types="Util/Thread.d.ts" />

declare interface GameModule {
    Name: string;
    KnitInit?: () => void;
    KnitStart?: () => void;
}

declare interface Controller extends GameModule {}
declare interface Service extends GameModule {
    Client: unknown;
}

declare interface ServiceMirror {
    [key: string]: ClientRemoteSignal | ClientRemoteProperty | ((...args: unknown[]) => unknown);
}

export namespace Knit {
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

    let Util: {
        TableUtil: TableUtil;
        Signal: typeof Signal;
        Thread: Thread
    };
}