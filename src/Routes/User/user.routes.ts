import { Router } from "express";
const userRouter = Router();

// User controller module {signUp,signIn,update,delete,getall} imports 🖣

import {
  getAllUsers,
  signUp,
  signIn,
  updateUser,
  deleteUser,
  userOrders,
  userProfile
} from "../../Controller/user/user.controller";

import { adminAuthValidation } from "../../Middlewares/AdminAuthMiddleware/admin.auth.middleware";
import { userAuthValidation } from "../../Middlewares/UserAuthMiddleware/user.auth.middleware";

// user routes 🖣

userRouter.get("/all",adminAuthValidation, getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/update",userAuthValidation, updateUser);
userRouter.delete("/delete/:user_id", adminAuthValidation, deleteUser);
userRouter.get("/orders/:user_id",userAuthValidation,userOrders)
userRouter.get("/profile/:user_id",userAuthValidation,userProfile)


export default userRouter;
