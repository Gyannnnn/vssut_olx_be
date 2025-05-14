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

import { adminSuperAdminAuthValidation } from "../../Middlewares/adminSuperAdminAuthMiddleware/admin.superadmin.auth.middleware";
import { student_studentSeller_authValidation } from "../../Middlewares/Student_SudentSeller_Middleware/student.studentseller.auth.middleware";

// user routes 🖣

userRouter.get("/all", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/update",student_studentSeller_authValidation, updateUser);
userRouter.delete("/delete/:user_id",adminSuperAdminAuthValidation,  deleteUser);
userRouter.get("/orders/:user_id",student_studentSeller_authValidation,userOrders)
userRouter.get("/profile/:user_id",student_studentSeller_authValidation,userProfile)


export default userRouter;
