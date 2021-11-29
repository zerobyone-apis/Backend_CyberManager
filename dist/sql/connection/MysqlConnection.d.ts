import Mysql from 'mysql';
export default class MysqlConnection {
    static conn: Mysql.Pool;
    static mysql: typeof Mysql;
    static connect(): Promise<void>;
}
