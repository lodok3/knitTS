interface match {
    Some: (...args: any[]) => unknown;
    None: () => unknown
}

export declare class Option<T> {
    static Some<T>(anyNonNilValue: T): Option<T>;
    static Wrap<T>(anyValue: T): Option<T>;
    static None: Option<null>;

    static Is(object: object): boolean;

    Match: (matches: match) => unknown;
    IsSome: () => boolean;
    IsNone: () => boolean;
    Unwrap: () => unknown;
    Expect(errMessage: string): unknown;
    ExpectNone(errMessage: string): null;
    UnwrapOr<T> (defaultValue: T): T | unknown; 
    UnwrapOrElse (defaultValue: (...args: undefined[]) => unknown): unknown;
    And(opt2: Option<unknown>): Option<any>;
    AndThen(predicate: (...unwrapped: unknown[]) => Option<unknown>): Option<any>;
    Or(opt2: Option<unknown>): Option<any>;
    AndThen(orElseFunction: () => Option<unknown>): Option<any>;
    XOr(opt2: Option<unknown>): Option<any>;
    Contains(value: any): boolean;
}