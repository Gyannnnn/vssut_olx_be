"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const user_controller_1 = require("../Controller/user.controller");
userRouter.get("/all", user_controller_1.getAllUsers);
exports.default = userRouter;
