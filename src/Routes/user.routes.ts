import { Router } from "express";
const userRouter = Router();

import { getAllUsers } from "../Controller/user.controller";

userRouter.get("/all",getAllUsers)


export default userRouter;