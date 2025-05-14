import { Router } from "express";
const adminRouter = Router();


//Admin controller module imports  🖣

import { createAdmin } from "../../Controller/Admin/admin.controller";
import { removeAdmin } from "../../Controller/Admin/admin.controller";
import { getAllAdmins } from "../../Controller/Admin/admin.controller";
import { adminSignIn } from "../../Controller/Admin/admin.controller";


import { superAdminAuthValidation } from "../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware";



// Admin route 🖣

adminRouter.get("/all",superAdminAuthValidation,getAllAdmins);
adminRouter.put("/create/:user_id",superAdminAuthValidation,createAdmin);
adminRouter.post("/signin",adminSignIn)
adminRouter.delete("/remove/:user_id",superAdminAuthValidation,removeAdmin);

// Admin router exports 🖣

export default adminRouter;