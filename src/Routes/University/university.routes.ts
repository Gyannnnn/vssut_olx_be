import { Router } from "express";
const universityRouter = Router()



// file imports 🖣
import { getUniversity } from "../../Controller/University/university.controller";
import { addNewUniversity } from "../../Controller/University/university.controller";
import { deleteUniversity } from "../../Controller/University/university.controller";

// Routes 🖣
universityRouter.get("/",getUniversity);
universityRouter.post("/add",addNewUniversity);
universityRouter.post("/del",deleteUniversity);

// Export 🖣
export default universityRouter;