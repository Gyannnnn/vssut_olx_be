"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
//Admin controller module imports  🖣
const admin_controller_1 = require("../Controller/admin.controller");
const admin_controller_2 = require("../Controller/admin.controller");
const admin_controller_3 = require("../Controller/admin.controller");
const admin_controller_4 = require("../Controller/admin.controller");
// Admin route 🖣
adminRouter.get("/all", admin_controller_4.getAllAdmins);
adminRouter.post("/create", admin_controller_1.createAdmin);
adminRouter.post("/signin", admin_controller_2.adminSignin);
adminRouter.delete("/remove/:admin_id", admin_controller_3.deleteAdmin);
// Admin router exports 🖣
exports.default = adminRouter;
