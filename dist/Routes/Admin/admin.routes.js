"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
//Admin controller module imports  🖣
const admin_controller_1 = require("../../Controller/Admin/admin.controller");
const admin_controller_2 = require("../../Controller/Admin/admin.controller");
const admin_controller_3 = require("../../Controller/Admin/admin.controller");
const admin_controller_4 = require("../../Controller/Admin/admin.controller");
const superAdmin_auth_middleware_1 = require("../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware");
// Admin route 🖣
adminRouter.get("/all", superAdmin_auth_middleware_1.superAdminAuthValidation, admin_controller_4.getAllAdmins);
adminRouter.post("/create", superAdmin_auth_middleware_1.superAdminAuthValidation, admin_controller_1.createAdmin);
adminRouter.post("/signin", admin_controller_2.adminSignin);
adminRouter.delete("/remove/:admin_id", superAdmin_auth_middleware_1.superAdminAuthValidation, admin_controller_3.deleteAdmin);
// Admin router exports 🖣
exports.default = adminRouter;
