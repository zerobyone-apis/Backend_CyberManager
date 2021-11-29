import Mysql from 'mysql';
import { Pool } from 'pg';
export default class MysqlConnection {
    static conn: Mysql.Pool;
    static connPost: Pool;
    static mysql: typeof Mysql;
    static connect(): Promise<void>;
    static connectPostgres(): Promise<void>;
}
