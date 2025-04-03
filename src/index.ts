//Package imports 🖣

require('dotenv').config()
import express from 'express'
import cors from 'cors'



// File imports 🖣

import universityRouter from './Routes/university.routes';
import userRouter from './Routes/user.routes';





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







app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`)
})