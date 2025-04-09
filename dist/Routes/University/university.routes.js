"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const universityRouter = (0, express_1.Router)();
// super admin auth validation middleware 🖣
const superAdmin_auth_middleware_1 = require("../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware");
// file imports 🖣
const university_controller_1 = require("../../Controller/University/university.controller");
const university_controller_2 = require("../../Controller/University/university.controller");
const university_controller_3 = require("../../Controller/University/university.controller");
// Routes 🖣
universityRouter.get("/", university_controller_1.getUniversity);
universityRouter.post("/add", superAdmin_auth_middleware_1.superAdminAuthValidation, university_controller_2.addNewUniversity);
universityRouter.post("/del", superAdmin_auth_middleware_1.superAdminAuthValidation, university_controller_3.deleteUniversity);
// Export 🖣
exports.default = universityRouter;
