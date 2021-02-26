export declare interface Table {
    [key: string]: any;
}

export declare interface TableUtil {
    Copy(tbl: Table): Table;
    CopyShallow(tbl: Table): Table;
    Sync(tbl: Table, templateTbl: Table): void;
    Print(tbl: Table, label: String, deepPrint: boolean): void;
    FastRemove(tbl: Table, index: number): void;
    FastRemoveFirstValue(tbl: Table, vairant: any): LuaTuple<[boolean, number | undefined]>;
    Map(tbl: Table, callback: (item: any) => any): Table;
    Filter(tbl: Table, callback: (item: any) => any): Table;
    Reduce(tbl: Table, callback: (item: any) => any, initalValue: number): Table;
    Assign(tbl: Table, ...args: Table[]): Table;
    Extend(tbl: Table, extensionTable: Table): void;
    IndexOf(tbl: Table, item: any): number | null;
    Reverse(tbl: Table): void;
    Shuffle(tbl: Table): void;
    IsEmpty(tbl: Table): boolean;
    EncodeJSON(tbl: Table): string;
    DecodeJSON(json: string): Table;
}