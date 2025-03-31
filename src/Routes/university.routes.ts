import { Router } from "express";
const universityRouter = Router()



// file imports 🖣
import { getUniversity } from "../Controller/university.controller";
import { addNewUniversity } from "../Controller/university.controller";


// Routes 🖣
universityRouter.get("/",getUniversity);
universityRouter.post("/add",addNewUniversity);

// Export 🖣
export default universityRouter;