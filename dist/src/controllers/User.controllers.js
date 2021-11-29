"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signIn = exports.findUserByID = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const moment_1 = __importDefault(require("moment"));
const QueryFunctions_1 = __importDefault(require("../../sql/connection/QueryFunctions"));
const Queries_1 = __importStar(require("../../sql/queries/Queries"));
let queryFunctions = new QueryFunctions_1.default();
let queries = new Queries_1.default();
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'getAll'), []);
        if (result.statusCode == 200) {
            return res.status(200).json(result.value.rows);
        }
        else {
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const enterpriseId = 1;
        const newUser = req.body.data;
        let queryParams = [
            newUser.username,
            newUser.passwd,
            newUser.charge,
            newUser.isAdmin,
            moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
            enterpriseId
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'create'), queryParams);
        if (result.statusCode == 200) {
            return res.status(201).json('success');
        }
        else {
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, passwd, charge, isAdmin } = req.body.data;
        const id = parseInt(req.params.id);
        let queryParams = [
            username,
            passwd,
            charge,
            isAdmin,
            moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
            id
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'update'), queryParams);
        if (result.statusCode == 200) {
            return res.status(200).json({ id: id });
        }
        else {
            console.log(`Error actualizando este usuario: ${req.body.data}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'delete'), [id]);
        if (result.statusCode == 200) {
            return res.status(200).json({
                message: `Usuario eliminado exitosamente con el id: ${id}`
            });
        }
        else {
            console.error(`Error borrando usuario con el id: ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.deleteUser = deleteUser;
function findUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const resultUser = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'getId'), [id]);
        if (resultUser.statusCode == 200) {
            if (resultUser.value.rows != []) {
                return res.status(200).json({
                    message: `Busqueda exitosa id user -> : ${id}`,
                    data: resultUser.value.rows[0]
                });
            }
            else {
                return res.status(404).json(`No se encontro usuario con el id: ${id}`);
            }
        }
        else {
            console.error(`Error buscando ususario con el id: ${id}`);
            return res.status(resultUser.statusCode).json(resultUser.value.rows);
        }
    });
}
exports.findUserByID = findUserByID;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body.data;
        const paramsQuery = [newUser.username, newUser.passwd];
        const result = yield queryFunctions.query(queries.getQuery(Queries_1.USER_TABLE, 'signIn'), paramsQuery);
        console.log(`\nEste es el resultado de la busqueda de usuario,`, result.value.rows, '\n');
        if (result.statusCode == 200) {
            if (result.value.rows != [] && result.value.rows[0] != undefined) {
                return res.status(200).json(result.value.rows[0]);
            }
            else {
                return res
                    .status(401)
                    .json(`El usuario no esta registrado, verifique usuario y contraseña`);
            }
        }
        else {
            return res.status(404).json(`Error: ${result.value.rows}`);
        }
    });
}
exports.signIn = signIn;
//# sourceMappingURL=User.controllers.js.map