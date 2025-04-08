require('dotenv').config()
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { Request, Response } from "express";
const prisma  = new PrismaClient();

// creates a superadmin  🖣

export const createSuperAdmin = async(req:Request,res: Response)=>{
    const{superAdminName,superAdminEmail,superAdminPassword,superAdminAvatar,superAdminMobile} = req.body
    if(!superAdminName?.trim()||!superAdminEmail?.trim()|| !superAdminPassword?.trim()|| !superAdminAvatar?.trim()||!superAdminMobile?.trim()){
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }
    try {
        const isExist = await prisma.superAdmin.findFirst({
            where:{
                superAdminEmail,
                
            }
        })
        if(isExist){
            res.status(400).json({
                message:"Super admin already exist"
            });
            return
        }
        const hashedPassword = await bcrypt.hash(superAdminPassword,10)
        const newSuperAdmin = await prisma.superAdmin.create({
            data:{
                superAdminName,
                superAdminEmail,
                superAdminPassword:hashedPassword,
                superAdminAvatar,
                superAdminMobileNo:superAdminMobile
            }
        })
        if(!newSuperAdmin){
            res.status(400).json({
                message:"Failed to create super admin"
            });
            return;
        }else{
            res.status(201).json({
                message: "Super Admin created successfully",
                newSuperAdmin
            });
            
        }

    } catch (error) {
        const err = error as Error
        res.status(400).json({
            message:err.message
        })
        
    }

}

// 🖣 Super admin signin
export const superAdminSignin   = async(req: Request, res: Response)=>{
    const {superAdminEmail,superAdminPassword} = req.body;
    if(!superAdminEmail?.trim()|| !superAdminPassword?.trim()){
        res.status(400).json({
            message: "All fields required"
        });
        return
    }
    try {
        const isExist = await prisma.superAdmin.findFirst({
            where:{
                superAdminEmail
            }
        });
        if(!isExist){
            res.status(400).json({
                message: "Super admin does not exist"
            });
            return;
        }
        const verfiedPassword = bcrypt.compare(superAdminPassword,isExist.superAdminPassword)
        if(!verfiedPassword){
            res.status(400).json({
                message: "Incorrect password"
            });
            return;
        }else{
            const token  = jwt.sign({superAdminEmail},process.env.JWT_SUPER_ADMIN_SECRET as string,{expiresIn:"1hr"});
            res.status(201).json({
                message: "Super user signed in successfully",
                token: token
            })
        }
    } catch (error) {
        const err = error as Error
        res.status(400).json({
            errorMessage:err.message
        })
        
    }

}