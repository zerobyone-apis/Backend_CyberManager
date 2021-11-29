export declare const ORDER_TABLE: string;
export declare const USER_TABLE: string;
export declare const ENTERPRISE_TABLE: string;
export default class Queries {
    private queries;
    getQuery(tableName: string, actionQuery: string): {
        table: string;
        action: string;
        query: any;
    } | null;
}
