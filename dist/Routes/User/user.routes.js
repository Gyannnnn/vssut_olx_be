"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// User controller module {signUp,signIn,update,delete,getall} imports 🖣
const user_controller_1 = require("../../Controller/user/user.controller");
const admin_superadmin_auth_middleware_1 = require("../../Middlewares/adminSuperAdminAuthMiddleware/admin.superadmin.auth.middleware");
const student_studentseller_auth_middleware_1 = require("../../Middlewares/Student_SudentSeller_Middleware/student.studentseller.auth.middleware");
// user routes 🖣
userRouter.get("/all", user_controller_1.getAllUsers);
userRouter.post("/signup", user_controller_1.signUp);
userRouter.post("/signin", user_controller_1.signIn);
userRouter.put("/update", student_studentseller_auth_middleware_1.student_studentSeller_authValidation, user_controller_1.updateUser);
userRouter.delete("/delete/:user_id", admin_superadmin_auth_middleware_1.adminSuperAdminAuthValidation, user_controller_1.deleteUser);
userRouter.get("/orders/:user_id", student_studentseller_auth_middleware_1.student_studentSeller_authValidation, user_controller_1.userOrders);
userRouter.get("/profile/:user_id", student_studentseller_auth_middleware_1.student_studentSeller_authValidation, user_controller_1.userProfile);
exports.default = userRouter;
