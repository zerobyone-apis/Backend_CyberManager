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
exports.deleteEnterprise = exports.updateEnterprise = exports.createEmpresa = exports.findEmpresaByUserID = exports.getEnterprise = void 0;
const moment_1 = __importDefault(require("moment"));
const QueryFunctions_1 = __importDefault(require("../../sql/connection/QueryFunctions"));
const Queries_1 = __importStar(require("../../sql/queries/Queries"));
let queryFunctions = new QueryFunctions_1.default();
let queries = new Queries_1.default();
function getEnterprise(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.getEnterprise = getEnterprise;
function findEmpresaByUserID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        console.log('User id -> ', id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ENTERPRISE_TABLE, 'getByUserId'), [id]);
        if (result.statusCode == 200) {
            console.log('Enterprise object finded -> ', result.value.rows);
            return res.status(200).json(result.value.rows[0]);
        }
        else {
            console.log(`Error obteniendo empresa por id`);
            return res.status(result.statusCode).json(result.value.rows[0]);
        }
    });
}
exports.findEmpresaByUserID = findEmpresaByUserID;
function createEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const enterprise = req.body.data;
        let queryParams = [
            moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
            enterprise.enterprisename,
            enterprise.phone,
            enterprise.cellphone,
            enterprise.fax,
            enterprise.location,
            enterprise.enterpriserules,
            enterprise.firstmessage,
            enterprise.secondmessage,
            enterprise.urllogo,
            moment_1.default().format('YYYY-MM-DD HH:mm:ss'),
            enterprise.username,
            enterprise.email
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ENTERPRISE_TABLE, 'create'), queryParams);
        if (result.statusCode == 200) {
            return res.status(200).json('Empresa creada satisfactoriamente!!');
        }
        else {
            console.log(`Error creando empresa`);
            return res.status(result.statusCode).json(result.value.rows[0]);
        }
    });
}
exports.createEmpresa = createEmpresa;
function updateEnterprise(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateEmp = req.body.data;
        const id = parseInt(req.params.id);
        let queryParams = [
            updateEmp.enterprisename,
            updateEmp.phone,
            updateEmp.cellphone,
            updateEmp.location,
            updateEmp.enterpriserules,
            updateEmp.firstmessage,
            updateEmp.secondmessage,
            updateEmp.urllogo,
            updateEmp.lastupdate,
            updateEmp.email,
            id
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ENTERPRISE_TABLE, 'update'), queryParams);
        if (result.statusCode == 200) {
            return res.status(200).json('Empresa guardada satisfactoriamente!!');
        }
        else {
            console.log(`Error guardando empresa`);
            return res.status(result.statusCode).json(result.value.rows[0]);
        }
    });
}
exports.updateEnterprise = updateEnterprise;
function deleteEnterprise(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ENTERPRISE_TABLE, 'delete'), [id]);
        if (result.statusCode == 200) {
            return res
                .status(200)
                .json(`Empresa eliminada exitosamente con el id: -> ${id}`);
        }
        else {
            console.log(`Error eliminando empresa`);
            return res.status(result.statusCode).json(result.value.rows[0]);
        }
    });
}
exports.deleteEnterprise = deleteEnterprise;
//# sourceMappingURL=Enterprise.controllers.js.map