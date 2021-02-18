import { Signal } from "Util/Signal";

export declare class RemoteProperty<T> {
    constructor(value: any, overrideClass?: string);

    Get(): T;
    Set<T>(value: any): void;
    Replicate(): void;
    Destroy(): void;

    Changed: Signal<T>;
}