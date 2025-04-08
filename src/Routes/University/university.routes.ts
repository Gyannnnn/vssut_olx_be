import { Router } from "express";
const universityRouter = Router()


// admin auth validation middleware 🖣
import { adminAuthValidation } from "../../Middlewares/AdminAuthMiddleware/admin.auth.middleware";


// file imports 🖣
import { getUniversity } from "../../Controller/University/university.controller";
import { addNewUniversity } from "../../Controller/University/university.controller";
import { deleteUniversity } from "../../Controller/University/university.controller";


// Routes 🖣
universityRouter.get("/",getUniversity);
universityRouter.post("/add",adminAuthValidation,addNewUniversity);
universityRouter.post("/del",adminAuthValidation,deleteUniversity);



// Export 🖣
export default universityRouter;