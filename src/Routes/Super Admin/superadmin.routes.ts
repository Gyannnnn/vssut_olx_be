import { Router } from "express";
const superAdminRouter = Router();
// super admin controller imports 🖣
import { createSuperAdmin } from "../../Controller/Super Admin/superadmin.controller";
import { superAdminSignin } from "../../Controller/Super Admin/superadmin.controller";

// super admin routes 🖣

superAdminRouter.post("/create",createSuperAdmin);
superAdminRouter.post("/signin",superAdminSignin)


// super admin router export 🖣
export default superAdminRouter;