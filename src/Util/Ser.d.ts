interface ClassSer {
    [className: string]: {
        Serialize<T>(value: T): any;
        Deserialize<T>(value: T): any;
    }
}

export declare class Ser {
    static Classes: ClassSer;
    static SerializeArgs(...args: any[]): Array<unknown>;
    static SerializeArgsAndUnpack(...args: any[]): LuaTuple<any>;
    static DeserializeArgs(...args: any[]): Array<unknown>;
    static DeserializeArgsAndUnpack(...args: any[]): LuaTuple<any>;
    static Serialize(value: any): any;
    static Deserialize(value: any): any;
    static UnpackArgs(...args: any[]): LuaTuple<any>;
}