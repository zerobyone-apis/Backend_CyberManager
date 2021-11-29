"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_controllers_1 = require("../controllers/Order.controllers");
const router = express_1.Router();
router
    .route('/')
    .get(Order_controllers_1.getOrders)
    .post(Order_controllers_1.createOrder);
router.route('/arqueo').patch(Order_controllers_1.doArqueo);
router
    .route('/:id')
    .get(Order_controllers_1.findByID)
    .put(Order_controllers_1.updateOrder)
    .delete(Order_controllers_1.deleteOrder);
router.route('/repair/:id').put(Order_controllers_1.updateRepairOrder);
router.route('/status/:id').put(Order_controllers_1.changeStatus);
router.route('/cancel/:id').put(Order_controllers_1.cancelOrder);
exports.default = router;
//# sourceMappingURL=Order.routes.js.map