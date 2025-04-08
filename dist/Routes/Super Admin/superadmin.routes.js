"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superAdminRouter = (0, express_1.Router)();
// super admin controller imports 🖣
const superadmin_controller_1 = require("../../Controller/Super Admin/superadmin.controller");
const superadmin_controller_2 = require("../../Controller/Super Admin/superadmin.controller");
// super admin routes 🖣
superAdminRouter.post("/create", superadmin_controller_1.createSuperAdmin);
superAdminRouter.post("/signin", superadmin_controller_2.superAdminSignin);
// super admin router export 🖣
exports.default = superAdminRouter;
