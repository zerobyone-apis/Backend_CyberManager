"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controllers_1 = require("../controllers/User.controllers");
const router = express_1.Router();
router
    .route("/")
    .get(User_controllers_1.getUsers)
    .post(User_controllers_1.createUser);
router
    .route("/:id")
    .get(User_controllers_1.findUserByID)
    .put(User_controllers_1.updateUser)
    .delete(User_controllers_1.deleteUser);
router
    .route("/signin")
    .post(User_controllers_1.signIn);
exports.default = router;
//# sourceMappingURL=User.routes.js.map