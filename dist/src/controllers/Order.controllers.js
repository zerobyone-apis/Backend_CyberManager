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
exports.deleteOrder = exports.cancelOrder = exports.changeStatus = exports.doArqueo = exports.updateRepairOrder = exports.updateOrder = exports.createOrder = exports.findByID = exports.getOrderByPagination = exports.getOrders = void 0;
const QueryFunctions_1 = __importDefault(require("../../sql/connection/QueryFunctions"));
const Queries_1 = __importStar(require("../../sql/queries/Queries"));
const queryFunctions = new QueryFunctions_1.default();
const queries = new Queries_1.default();
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'getAll'), []);
        console.log('\nEstructura de los objetos encontrados [ Order ]: ', result.value.rows[0], '\n');
        if (result.statusCode == 200) {
            return res.status(200).json(result.value.rows);
        }
        else {
            console.log(`Error cargando todos los pedidos`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.getOrders = getOrders;
function getOrderByPagination(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'getByPagination'), [req.body.limit, req.body.offset]);
        if (result.statusCode == 200) {
            return res.status(200).json(result.value.rows);
        }
        else {
            console.log(`Error cargando todos los pedidos`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.getOrderByPagination = getOrderByPagination;
function findByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('req body data ', req.body.data);
        console.log('req params ', req.params);
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'getId'), [id]);
        if (result.statusCode == 200) {
            return res.status(200).json(result.value.rows);
        }
        else {
            console.log(`Error buscando pedido con el id: ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.findByID = findByID;
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { admissiondate, clientname, clientphone, article, model, brand, reportedfailure, observations, iscanceled, status } = req.body.data;
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'create'), [
            clientname,
            clientphone,
            article,
            model,
            brand,
            admissiondate,
            reportedfailure,
            observations,
            iscanceled,
            status
        ]);
        let queryParams = [clientname, admissiondate, article];
        if (result.statusCode == 200) {
            let resultId = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'getNew'), queryParams);
            console.log('Resultado obtenido : ', resultId);
            console.log('Obtener el id creado desde las rows: ', resultId.value.rows);
            return res.status(resultId.statusCode).json(resultId.value.rows);
        }
        else {
            console.log('Error creando Order', result);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.createOrder = createOrder;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientname, clientphone, article, model, brand, reportedfailure, observations, iscanceled, status } = req.body.data;
        const id = parseInt(req.params.id);
        let queryParams = [
            clientname,
            clientphone,
            article,
            model,
            brand,
            reportedfailure,
            observations,
            iscanceled,
            status,
            id
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'update'), queryParams);
        if (result.statusCode == 200) {
            return res.status(200).json('pedido guardado exitosamente');
        }
        else {
            console.log(`Error editando el pedido con el id: ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.updateOrder = updateOrder;
function updateRepairOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientname, article, iscanceled, deliverydate, repairdate, reparation, warranty, price, status, replacementprice } = req.body.data;
        const id = parseInt(req.params.id);
        let queryParams = [
            clientname,
            article,
            iscanceled,
            deliverydate,
            repairdate,
            reparation,
            warranty,
            price,
            status,
            replacementprice,
            id
        ];
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'reparacion'), queryParams);
        if (result.statusCode == 200) {
            return res.status(200).json('Reparacion de Order guardado exitosamente');
        }
        else {
            console.log(`Error guardando la reparacion del Order con el id: ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.updateRepairOrder = updateRepairOrder;
function doArqueo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\nArqueo: Contenido del req body data -> ', req.body.data, '\n');
        const { startDate, endDate } = req.body.data;
        try {
            let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'arqueo'), [startDate, endDate]);
            console.log('\nResult Arqueo -> ', result.value.rows[0], '\n');
            if (result.statusCode == 200) {
                return res.status(200).json(result.value.rows[0]);
            }
        }
        catch (error) {
            console.log(`Error realizando el arqueo entre estas fechas ->  ${startDate} and ${endDate}`);
            return res.status(error.statusCode).json(error.value.rows[0]);
        }
    });
}
exports.doArqueo = doArqueo;
function changeStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status } = req.body;
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'setStatus'), [status, id]);
        if (result.statusCode == 200) {
            return res.status(200).json('Estado cambiado exitosamente.');
        }
        else {
            console.log(`Error cambiando de estado este Order id : ->' ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.changeStatus = changeStatus;
function cancelOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { iscanceled } = req.body;
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'cancel'), [iscanceled, id]);
        if (result.statusCode == 200) {
            return res.status(200).json('Order cancelado exitosamente');
        }
        else {
            console.log(`Error cancelando el Order con el id: ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.cancelOrder = cancelOrder;
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        let result = yield queryFunctions.query(queries.getQuery(Queries_1.ORDER_TABLE, 'delete'), [id]);
        if (result.statusCode == 200) {
            return res
                .status(200)
                .json(`Order eliminado exitosamente con el id: -> ${id}`);
        }
        else {
            console.log(`Error elimiando este Order id: -> ${id}`);
            return res.status(result.statusCode).json(result.value.rows);
        }
    });
}
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=Order.controllers.js.map