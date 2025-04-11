//Package imports 🖣

require('dotenv').config()
import express from 'express'
import cors from 'cors'



// File imports 🖣

import universityRouter from './Routes/University/university.routes';
import userRouter from './Routes/User/user.routes';
import adminRouter from './Routes/Admin/admin.routes';
import superAdminRouter from './Routes/Super Admin/superadmin.routes';
import productRouter from './Routes/Product/product.routes';




// Middlewares 🖣
const app = express()
app.use(express.json())
app.use(cors())

// Routes 🖣

app.get("/",(req,res)=>{
    res.json({
        "Welcome":"Welcome to Vssut OLX  Api."
    })
})

// Middleware Routes 🖣

app.use("/api/v1/university",universityRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/superadmin",superAdminRouter);
app.use("/api/v1/products",productRouter);







app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`)
})