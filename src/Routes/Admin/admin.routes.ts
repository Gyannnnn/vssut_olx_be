import { Router } from "express";
const adminRouter = Router();

//Admin controller module imports  🖣

import { createAdmin } from "../../Controller/Admin/admin.controller";
import { adminSignin } from "../../Controller/Admin/admin.controller";
import { deleteAdmin } from "../../Controller/Admin/admin.controller";
import { getAllAdmins } from "../../Controller/Admin/admin.controller";



// Admin route 🖣

adminRouter.get("/all",getAllAdmins);
adminRouter.post("/create",createAdmin);
adminRouter.post("/signin",adminSignin);
adminRouter.delete("/remove/:admin_id",deleteAdmin);

// Admin router exports 🖣

export default adminRouter;