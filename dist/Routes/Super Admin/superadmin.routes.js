"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superAdminRouter = (0, express_1.Router)();
const superadmin_controller_1 = require("../../Controller/Super Admin/superadmin.controller");
const superadmin_controller_2 = require("../../Controller/Super Admin/superadmin.controller");
superAdminRouter.post("/create", superadmin_controller_1.createSuperAdmin);
superAdminRouter.post("/signin", superadmin_controller_2.superAdminSignin);
exports.default = superAdminRouter;
