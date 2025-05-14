import { Router } from "express";
const superAdminRouter = Router();
// super admin controller imports 🖣
import { createSuperAdmin } from "../../Controller/Super Admin/superadmin.controller";
import { superAdminSignin } from "../../Controller/Super Admin/superadmin.controller";

// super admin routes 🖣

import { superAdminAuthValidation } from "../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware";

superAdminRouter.put("/create/:user_id",superAdminAuthValidation,createSuperAdmin);
superAdminRouter.post("/signin",superAdminSignin)


// super admin router export 🖣
export default superAdminRouter;