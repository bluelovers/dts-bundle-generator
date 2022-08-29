export interface PrimitiveValues {
    boolean: false;
    requiredBoolean: true;
    string: '';
    requiredString: 'REQUIRED';
}
export type SchemeDescriptor<T> = {
    [P in keyof T]-?: T[P] extends unknown[] ? [SchemeDescriptor<T[P][number]>] : SchemeDescriptor<T[P]>;
};
export declare const schemaPrimitiveValues: Readonly<PrimitiveValues>;
export declare function checkSchemaMatch<T>(value: unknown, schema: SchemeDescriptor<T>, errors: string[]): value is T;
