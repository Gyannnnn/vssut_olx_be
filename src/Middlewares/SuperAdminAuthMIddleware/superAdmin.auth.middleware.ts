require('dotenv').config()
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'



export const superAdminAuthValidation = async(req: Request,res: Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            message: "Unauthorised access"
        });
        return;
    }
    const token = authHeader.split(" ")[1]
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SUPER_ADMIN_SECRET!);
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
    

}