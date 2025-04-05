import { Router } from "express";
const userRouter = Router();

// User controller module {signUp,signIn,update,delete,getall} imports 🖣

import { getAllUsers } from "../../Controller/user/user.controller";
import { signUp } from "../../Controller/user/user.controller";
import { signIn } from "../../Controller/user/user.controller";
import { updateUser } from "../../Controller/user/user.controller";
import { deleteUser } from "../../Controller/user/user.controller";

// user routes 🖣

userRouter.get("/all",getAllUsers);
userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn);
userRouter.put("/update",updateUser);
userRouter.delete("/delete/:user_id",deleteUser);


export default userRouter;