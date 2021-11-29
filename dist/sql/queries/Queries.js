"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTERPRISE_TABLE = exports.USER_TABLE = exports.ORDER_TABLE = void 0;
require('dotenv').config();
const app_1 = require("../../src/app");
function selectDb(flagToOn) {
    return flagToOn === app_1.dbConnectTypePostgres
        ? process.env.P_DATABASE
        : process.env.M_DATABASE;
}
const DATABASE = selectDb(app_1.dbConnectTypePostgres);
console.log('Database connected is -> ', DATABASE);
exports.ORDER_TABLE = `orders`;
exports.USER_TABLE = `users`;
exports.ENTERPRISE_TABLE = `enterprise`;
class Queries {
    constructor() {
        this.queries = {
            [exports.USER_TABLE]: {
                getAll: `SELECT * FROM ${exports.USER_TABLE}`,
                getId: `SELECT * FROM ${exports.USER_TABLE} WHERE iduser = $1`,
                create: `INSERT INTO ${exports.USER_TABLE}(username, passwd, charge, isAdmin, createOn, enterprise) values($1,$2,$3,$4,$5,$6)`,
                update: `UPDATE ${exports.USER_TABLE} SET username = $1 , passwd = $2 , charge = $3 , isAdmin = $4 , updateOn = $5 WHERE iduser = $6`,
                delete: `DELETE FROM ${exports.USER_TABLE} WHERE iduser = $1`,
                signIn: `SELECT * FROM ${exports.USER_TABLE} where username = $1 and passwd = $2`
            },
            [exports.ORDER_TABLE]: {
                getNew: `SELECT id from ${exports.ORDER_TABLE} where clientName = $1 and admissionDate = $2 and article = $3`,
                getAll: `SELECT * FROM ${exports.ORDER_TABLE}`,
                getId: `SELECT * FROM ${exports.ORDER_TABLE} WHERE id = $1`,
                create: `INSERT INTO ${exports.ORDER_TABLE}(clientname, clientphone, article, model, brand, admissiondate, reportedfailure, observations, iscanceled, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                setStatus: `UPDATE ${exports.ORDER_TABLE} SET status = $1 where id = $2`,
                update: `UPDATE ${exports.ORDER_TABLE} SET clientName = $1, clientPhone = $2, article = $3, model = $4, brand = $5 , reportedFailure = $6, observations = $7, isCanceled = $8, status = $9 WHERE id = $10`,
                reparacion: `UPDATE ${exports.ORDER_TABLE} SET clientName = $1, article = $2, isCanceled = $3, deliveryDate = $4, repairDate = $5, reparation = $6, warranty = $7, price = $8, status = $9, replacementPrice = $10 WHERE id = $11`,
                delete: `DELETE FROM ${exports.ORDER_TABLE} WHERE id = $1`,
                cancel: `UPDATE ${exports.ORDER_TABLE} SET isCanceled = $1 WHERE id = $2`,
                arqueo: `SELECT SUM(price) as totalPrice, SUM(replacementPrice) as totalReplacementPrice, sum(price - replacementPrice) as netoPrice, count(price) as cantArticles from ${exports.ORDER_TABLE} where (deliveryDate BETWEEN $1 and $2) and status like '%Entregado%'`
            },
            [exports.ENTERPRISE_TABLE]: {
                getAll: `SELECT username, id FROM ${exports.ENTERPRISE_TABLE}`,
                getByUserId: `SELECT e.*, u.charge from ${exports.USER_TABLE} u inner join ${exports.ENTERPRISE_TABLE} e on (u.enterprise = e.id) where u.idUser = $1 and u.charge LIKE '%Supervisor%' OR u.charge LIKE '%Empleado%' limit 1`,
                create: `INSERT INTO ${exports.ENTERPRISE_TABLE} ( createdDate, enterpriseName, phone, cellphone, fax, location, enterpriseRules, firstMessage, secondMessage, urlLogo, lastUpdate, username, mail) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                update: `UPDATE ${exports.ENTERPRISE_TABLE} SET enterpriseName = $1, phone = $2, cellphone = $3, location = $4, enterpriseRules = $5, firstMessage = $6, secondMessage = $7, urlLogo = $8, lastUpdate = $9, email = $10 WHERE id = $11`,
                delete: `DELETE FROM ${exports.ENTERPRISE_TABLE} WHERE id = $1`
            }
        };
    }
    getQuery(tableName, actionQuery) {
        try {
            return {
                table: tableName,
                action: actionQuery,
                query: this.queries[tableName][actionQuery]
            };
        }
        catch (error) {
            console.log(`Error in getQuery :` + error);
            return null;
        }
    }
}
exports.default = Queries;
//# sourceMappingURL=Queries.js.map