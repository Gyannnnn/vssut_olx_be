import { Router } from "express";
const adminRouter = Router();

//Admin controller module imports  🖣

import { createAdmin } from "../Controller/admin.controller";
import { adminSignin } from "../Controller/admin.controller";
import { deleteAdmin } from "../Controller/admin.controller";
import { getAllAdmins } from "../Controller/admin.controller";



// Admin route 🖣

adminRouter.get("/all",getAllAdmins);
adminRouter.post("/create",createAdmin);
adminRouter.post("/signin",adminSignin);
adminRouter.delete("/remove/:admin_id",deleteAdmin);

// Admin router exports 🖣

export default adminRouter;