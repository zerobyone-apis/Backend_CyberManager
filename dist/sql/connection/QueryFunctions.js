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
const Connections_1 = __importDefault(require("./Connections"));
const ResultObject_1 = __importDefault(require("../../src/utils/ResultObject"));
const app_1 = require("../../src/app");
class QueryFunctions {
    query(queryData, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("");
            console.log("");
            console.log("-> START QUERY. " +
                `[ ${queryData.action} ]` +
                " of table " +
                `[ ${queryData.table} ]: `);
            let query = queryData.query;
            let reader = "";
            let index = 0;
            for (let i = 0; i < queryData.query.length; i++) {
                if (query[i] === "?" || query[i] === "$") {
                    switch (typeof data[index]) {
                        case "number":
                            reader += data[index];
                            break;
                        case "boolean":
                            reader += data[index];
                            break;
                        case "string":
                            reader += `'${data[index]}'`;
                            break;
                    }
                    index++;
                }
                else {
                    reader += queryData.query[i];
                }
            }
            console.log(reader);
            console.log(data);
            console.log("total of items in data: ", data.length);
            console.log("total of ? or $ in query: ", index);
            console.log("END_QUERY");
            try {
                let result = yield new Promise((resolve, reject) => {
                    if (app_1.dbConnectTypePostgres) {
                        console.log("Query -> Postgres connection ", queryData);
                        Connections_1.default.connPost.query(queryData.query, data, (err, result) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                    else if (app_1.dbConnectTypeMysql) {
                        console.log(" Query -> MySQL connection ", queryData);
                        Connections_1.default.conn.query(queryData.query, data, (err, result, fieldPacket) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                }).catch((err) => {
                    throw err;
                });
                return new ResultObject_1.default(result.statusCode, result.value);
            }
            catch (error) {
                return error;
            }
        });
    }
    get(queryData, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Get -> QueryData: ", queryData.query);
            console.log("() _-> ", data);
            try {
                console.log(data);
                console.log("total of items in data: ", data.length);
                console.log("END_QUERY");
                const rows = yield new Promise((resolve, reject) => {
                    if (app_1.dbConnectTypePostgres) {
                        console.log("Get -> Postgres connection ", queryData);
                        Connections_1.default.connPost.query(queryData.query, data, (err, result) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                    else if (app_1.dbConnectTypeMysql) {
                        console.log("GET -> Mysql connection ", queryData);
                        Connections_1.default.conn.query(queryData.query, data, (err, result, fieldPacket) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                }).catch((err) => {
                    throw err;
                });
                console.log(rows);
                return new ResultObject_1.default(200, rows);
            }
            catch (ex) {
                const fail = new ResultObject_1.default(403, {
                    "Error ": "table " +
                        queryData.table +
                        " - action " +
                        queryData.action +
                        " :" +
                        String(ex),
                });
                console.log(fail);
                return fail;
            }
        });
    }
    action(queryData, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Action query data: ", queryData.query);
            console.log("() -> ", data);
            try {
                yield new Promise((resolve, reject) => {
                    if (app_1.dbConnectTypePostgres) {
                        console.log("Action -> Postgres connection ", queryData);
                        Connections_1.default.connPost.query(queryData.query, data, (err, result) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                    else if (app_1.dbConnectTypeMysql) {
                        console.log("Action -> Mysql connection ", queryData);
                        Connections_1.default.conn.query(queryData.query, data, (err, result, fieldPacket) => {
                            if (!err) {
                                resolve(new ResultObject_1.default(200, result));
                            }
                            else {
                                reject(new ResultObject_1.default(403, err));
                            }
                        });
                    }
                }).catch((err) => {
                    throw err;
                });
                return new ResultObject_1.default(200, "sucess " + queryData.action + " in table" + queryData.table);
            }
            catch (ex) {
                const fail = new ResultObject_1.default(403, {
                    "Error ": "table " +
                        queryData.table +
                        " - action " +
                        queryData.action +
                        " :" +
                        String(ex),
                });
                console.log(fail);
                return fail;
            }
        });
    }
}
exports.default = QueryFunctions;
//# sourceMappingURL=QueryFunctions.js.map