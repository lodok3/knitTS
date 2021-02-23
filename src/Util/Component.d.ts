import { Signal } from "./Signal";

export declare interface CreatedComponent {
    Init?: (...args: any[]) => void;
    Deinit?: (...args: any[]) => void;
    HeartbeatUpdate?: (deltaTime: number) => void;
    SteppedUpdate?: (deltaTime: number) => void;
    RenderUpdate?: (deltaTime: number) => void;

    Destroy?: () => void;
}

export declare class Component {
    Auto: (folder: Folder) => void;
    Added: Signal;
    Removed: Signal;
    constructor(tag: string, component: CreatedComponent, renderPriority?: Enum.RenderPriority);
}