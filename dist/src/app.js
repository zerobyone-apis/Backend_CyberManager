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
exports.App = exports.dbConnectTypePostgres = exports.dbConnectTypeMysql = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const Connections_1 = __importDefault(require("../sql/connection/Connections"));
const Enterprise_routes_1 = __importDefault(require("./routes/Enterprise.routes"));
const Order_routes_1 = __importDefault(require("./routes/Order.routes"));
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const Routes_type_1 = require("./types/Routes.type");
exports.dbConnectTypeMysql = 'Mysql';
exports.dbConnectTypePostgres = 'postgres';
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.app.use(cors_1.default());
        const server = http_1.default.createServer(this.app);
        server.listen(port);
        this.connect(exports.dbConnectTypePostgres);
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(Routes_type_1.ENTERPRISE_ROUTE, Enterprise_routes_1.default);
        this.app.use(Routes_type_1.ORDER_ROUTE, Order_routes_1.default);
        this.app.use(Routes_type_1.USER_ROUTE, User_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('');
            console.log('══════════════════════════');
            console.log('');
            console.log(' ╦══╦      ╦═╦   ╦══╦');
            console.log(' ╠═╝╠═╦═╦═╗║░╩╦╦╗║╔╗╠═╦═╗ ');
            console.log(' ║╔═╣╩╣╠╣║║║░░║║║║╚╝║║║╩╣ ');
            console.log(' ╚══╩═╩╝╚═╝╚══╬╗║╚══╩╩╩═╝ ');
            console.log('              ╩═╩');
            console.log(` CyberManager backend is ready on port ${this.port}`);
            console.log('');
            console.log('══════════════════════════');
            console.log('');
        });
    }
    connect(dbConnectType) {
        dbConnectType && dbConnectType === 'Mysql'
            ? Connections_1.default.connect()
            : Connections_1.default.connectPostgres();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map