import { ClientRemoteProperty as _ClientRemoteProperty } from "./Util/Remote/ClientRemoteProperty";
import { ClientRemoteSignal as _ClientRemoteSignal } from "./Util/Remote/ClientRemoteSignal";
import { RemoteProperty as _RemoteProperty } from "./Util/Remote/RemoteProperty";
import { RemoteSignal as _RemoteSignal } from "./Util/Remote/RemoteSignal";
import { TableUtil } from "./Util/TableUtil"
import { Signal as _Signal } from "./Util/Signal";
import { Thread } from "./Util/Thread";
import { Component as _Component } from "Util/Component";
import { Connection as _Connection } from "Util/Connection";
import Maid from "Util/Maid"

declare interface GameModule {
    Name: string;
    KnitInit?: () => void;
    KnitStart?: () => void;
    [key: string]: unknown;
    [key: number]: unknown;
}

declare interface Controller extends GameModule {}
declare interface Service extends GameModule {
    Client: unknown;
}

declare interface ServiceMirror {
    [key: string]: _ClientRemoteSignal | _ClientRemoteProperty | ((...args: unknown[]) => unknown);
}

declare namespace Knit {
    class KnitClient {
        static CreateController: (controller: Controller) => Controller;
        static AddControllers: (folder: Folder) => Controller[];
        static AddControllersDeep: (folder: Folder) => Controller[];
        static GetService: (serviceName: string) => ServiceMirror;
        static GetController: (controller: Controller) => Controller;
        static Start: () => void;
        static OnStart: Promise<null>;
    }

    class KnitServer {
        static IsService: (object: object) => boolean;
        static CreateService: (service: Service) => Service;
        static AddServices: (folder: Folder) => Service[];
        static AddServicesDeep: (folder: Folder) => Service[];
        static Start: () => void;
        static OnStart: Promise<null>;
    }

    module Util {
        class Component extends _Component {}
        class Connection<T> extends _Connection<T> {}
        class ClientRemoteProperty extends _ClientRemoteProperty {}
        class ClientRemoteSignal extends _ClientRemoteSignal {}
        const Maid: Maid
        class RemoteProperty extends _RemoteProperty {}
        class RemoteSignal extends _RemoteSignal {}
        class Signal extends _Signal {}
        const TableUtil: TableUtil
        const Thread: Thread
    }
}

export = Knit;