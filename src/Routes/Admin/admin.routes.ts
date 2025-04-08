import { Router } from "express";
const adminRouter = Router();


//Admin controller module imports  🖣

import { createAdmin } from "../../Controller/Admin/admin.controller";
import { adminSignin } from "../../Controller/Admin/admin.controller";
import { deleteAdmin } from "../../Controller/Admin/admin.controller";
import { getAllAdmins } from "../../Controller/Admin/admin.controller";


import { superAdminAuthValidation } from "../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware";



// Admin route 🖣

adminRouter.get("/all",superAdminAuthValidation,getAllAdmins);
adminRouter.post("/create",superAdminAuthValidation,createAdmin);
adminRouter.post("/signin",adminSignin);
adminRouter.delete("/remove/:admin_id",superAdminAuthValidation,deleteAdmin);

// Admin router exports 🖣

export default adminRouter;