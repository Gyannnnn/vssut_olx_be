"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// User controller module {signUp,signIn,update,delete,getall} imports 🖣
const user_controller_1 = require("../Controller/user.controller");
const user_controller_2 = require("../Controller/user.controller");
const user_controller_3 = require("../Controller/user.controller");
const user_controller_4 = require("../Controller/user.controller");
const user_controller_5 = require("../Controller/user.controller");
// user routes 🖣
userRouter.get("/all", user_controller_1.getAllUsers);
userRouter.post("/signup", user_controller_2.signUp);
userRouter.post("/signin", user_controller_3.signIn);
userRouter.put("/update", user_controller_4.updateUser);
userRouter.delete("/delete/:user_id", user_controller_5.deleteUser);
exports.default = userRouter;
