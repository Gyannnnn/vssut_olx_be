import { Router } from "express";
const universityRouter = Router()


// super admin auth validation middleware 🖣

import { superAdminAuthValidation } from "../../Middlewares/SuperAdminAuthMIddleware/superAdmin.auth.middleware";

// file imports 🖣
import { getUniversity } from "../../Controller/University/university.controller";
import { addNewUniversity } from "../../Controller/University/university.controller";
import { deleteUniversity } from "../../Controller/University/university.controller";


// Routes 🖣
universityRouter.get("/",getUniversity);
universityRouter.post("/add",superAdminAuthValidation,addNewUniversity);
universityRouter.post("/del",superAdminAuthValidation,deleteUniversity);



// Export 🖣
export default universityRouter;