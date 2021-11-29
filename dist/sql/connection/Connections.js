"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mysql_1 = __importDefault(require("mysql"));
const pg_1 = require("pg");
class MysqlConnection {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connecting MySql..');
            this.conn = this.mysql.createPool({
                host: process.env.M_HOST,
                user: process.env.M_USER_NAME,
                password: process.env.M_PASSWORD,
                database: process.env.M_DATABASE,
                port: parseInt(process.env.M_PORTDB || '3306')
            });
            setInterval(() => {
                this.conn.query('SELECT 1', (err, rows) => {
                    if (err)
                        throw err;
                });
            }, 1000);
        });
    }
    static connectPostgres() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connecting postgresql...');
            this.connPost = new pg_1.Pool({
                host: process.env.P_HOST,
                user: process.env.P_USER_NAME,
                password: process.env.P_PASSWORD,
                database: process.env.P_DATABASE,
                port: parseInt(process.env.P_PORTDB || '5432'),
                ssl: {
                    rejectUnauthorized: false,
                },
            });
        });
    }
}
exports.default = MysqlConnection;
MysqlConnection.mysql = mysql_1.default;
//# sourceMappingURL=Connections.js.map