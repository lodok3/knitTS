import { Signal } from "Util/Signal";

export declare class RemoteProperty {
    constructor(value: any, overrideClass?: string);

    Get(): unknown;
    Set(value: any): void;
    Replicate(): void;
    Destroy(): void;

    Changed: Signal;
    static Is(object: unknown): boolean;

    _object: Instance;
}