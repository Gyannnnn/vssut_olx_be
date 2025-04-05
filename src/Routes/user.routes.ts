import { Router } from "express";
const userRouter = Router();

import { getAllUsers } from "../Controller/user.controller";
import { signUp } from "../Controller/user.controller";
import { signIn } from "../Controller/user.controller";
import { updateUser } from "../Controller/user.controller";
import { deleteUser } from "../Controller/user.controller";

userRouter.get("/all",getAllUsers);
userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn);
userRouter.put("/update",updateUser);
userRouter.delete("/delete/:user_id",deleteUser);


export default userRouter;