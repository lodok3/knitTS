interface Table {
    [key: string]: any;
}

export declare abstract class TableUtil {
    static Copy(tbl: Table): Table;
    static CopyShallow(tbl: Table): Table;
    static Sync(tbl: Table, templateTbl: Table): void;
    static Print(tbl: Table, label: String, deepPrint: boolean): void;
    static FastRemove(tbl: Table, index: number): void;
    static FastRemoveFirstValue(tbl: Table, vairant: any): LuaTuple<[boolean, number | undefined]>;
    static Map(tbl: Table, callback: (item: any) => any): Table;
    static Filter(tbl: Table, callback: (item: any) => any): Table;
    static Reduce(tbl: Table, callback: (item: any) => any, initalValue: number): Table;
    static Assign(tbl: Table, ...args: Table[]): Table;
    static Extend(tbl: Table, extensionTable: Table): void;
    static IndexOf(tbl: Table, item: any): number | null;
    static Reverse(tbl: Table): void;
    static Shuffle(tbl: Table): void;
    static IsEmpty(tbl: Table): boolean;
    static EncodeJSON(tbl: Table): string;
    static DecodeJSON(json: string): Table;
}