"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// User controller module {signUp,signIn,update,delete,getall} imports 🖣
const user_controller_1 = require("../../Controller/user/user.controller");
const admin_auth_middleware_1 = require("../../Middlewares/AdminAuthMiddleware/admin.auth.middleware");
const user_auth_middleware_1 = require("../../Middlewares/UserAuthMiddleware/user.auth.middleware");
// user routes 🖣
userRouter.get("/all", admin_auth_middleware_1.adminAuthValidation, user_controller_1.getAllUsers);
userRouter.post("/signup", user_controller_1.signUp);
userRouter.post("/signin", user_controller_1.signIn);
userRouter.put("/update", user_auth_middleware_1.userAuthValidation, user_controller_1.updateUser);
userRouter.delete("/delete/:user_id", admin_auth_middleware_1.adminAuthValidation, user_controller_1.deleteUser);
userRouter.get("/orders/:user_id", user_auth_middleware_1.userAuthValidation, user_controller_1.userOrders);
userRouter.get("/profile/:user_id", user_auth_middleware_1.userAuthValidation, user_controller_1.userProfile);
exports.default = userRouter;
