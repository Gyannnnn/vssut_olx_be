import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import bcrypt from  "bcryptjs"



const prisma = new PrismaClient();



export const getAllUsers = async(req:Request,res: Response)=>{
    try {
        const allUsers = await prisma.user.findMany();
    if(!allUsers || allUsers.length === 0){
        res.status(400).json({
            message: "No users exist !"
        })
        return;
    }
    res.status(200).json({
        users: allUsers
    })
        
    } catch (error) {
        const err = error as Error;
        res.json({
            message: err.message
        })
    }
}


export const signUp = async(req: Request,res: Response)=>{
    const {userName,userEmail,userMobileNo,password,userUniversity} = req.body
    if (!userName?.trim() || !userEmail?.trim() || !userMobileNo?.trim() || !password?.trim() || !userUniversity?.trim()) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data: {
                userName,
                userEmail,
                hashedPassword,
                userMobileNo,
                 
                userUniversity: {
                    connect: { university_id: userUniversity } // Correct way to link the university
                }
            }
        });

    } catch (error) {
        
    }

}