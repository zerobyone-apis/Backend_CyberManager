"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Enterprise_controllers_1 = require("../controllers/Enterprise.controllers");
const router = express_1.Router();
router
    .route('/')
    .get(Enterprise_controllers_1.getEnterprise)
    .post(Enterprise_controllers_1.createEmpresa);
router
    .route('/:id')
    .get(Enterprise_controllers_1.findEmpresaByUserID)
    .put(Enterprise_controllers_1.updateEnterprise)
    .delete(Enterprise_controllers_1.deleteEnterprise);
exports.default = router;
//# sourceMappingURL=Enterprise.routes.js.map