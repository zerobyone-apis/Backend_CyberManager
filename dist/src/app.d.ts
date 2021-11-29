export declare const dbConnectTypeMysql: string;
export declare const dbConnectTypePostgres: string;
export declare class App {
    private port;
    private app;
    constructor(port: number | string);
    settings(): void;
    middlewares(): void;
    routes(): void;
    listen(): Promise<void>;
    connect(dbConnectType: string): void;
}
