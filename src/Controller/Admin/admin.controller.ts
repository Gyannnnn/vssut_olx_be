require('dotenv').config()
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";


// Fetches all admins existed on data base 🖣
export const getAllAdmins = async(req: Request, res: Response)=>{
  try {
    const allAdmins = await prisma.user.findMany({
        where:{
            role:"ADMIN"
        }
    })
    if(!allAdmins || allAdmins.length === 0){
      res.status(400).json({
        message: "No admins found"
      });
      return;
    }
    res.status(201).json({
      message:"Successfully fetched all admins",
      allAdmins
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: "Something Went wrong try again",
      "Error message":err.message
    })
    
  }

}

// creates a new admin 🖣
export const createAdmin = async (req: Request, res: Response) => {
  const {user_id} = req.params
    if(!user_id?.trim()){
        res.status(400).json({
            message: "User id required"
        })
    }
    try {
        const student = await prisma.user.findFirst({
            where:{
                user_id
            }
        })
        if(!student){
            res.status(404).json({
                message: "No user found !"
            });
            return
        }
        if(student.role === "ADMIN"){
            res.status(409).json({
                message: `${student.userName} is already an Admin`
            });
            return
        }
        await prisma.user.update({
            where:{
                user_id
            },
            data:{
                role:"ADMIN"
            }
        })
        res.status(200).json({
            message: `${student.userName} appointed as admin`
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};



// Deleted an admin when admin_id is given on the parameter  🖣

export const removeAdmin = async(req:Request,res: Response)=>{
    const{user_id} = req.params
    if(!user_id?.trim()){
        res.status(400).json({
            message: "All fields are required"
        });
        return
    }

    try {
        const admin = await prisma.user.findFirst({
            where:{
                user_id,
                role:"ADMIN"
            }
        })
        if(!admin){
            res.status(404).json({
                message: "No admin found !"
            });
            return
        }
        
        await prisma.user.update({
            where:{
                user_id,
                role:"ADMIN"
            },
            data:{
                role:"STUDENT"
            }
        })
        res.status(200).json({
            messsage: `${admin.userName} terminated from admin position`
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message:"Internal server error",
            error:err.message
        })
        
    }
 
}



export const adminSignIn = async (req: Request, res: Response) => {
  const { userMobileNo, password } = req.body;
  if (!userMobileNo?.trim() || !password?.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const isExist = await prisma.user.findFirst({
      where: {
        userMobileNo,
      },
    });
    if (!isExist) {
      res.status(400).json({
        message: "User doesnot exists Try signing up",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      isExist.hashedPassword
    );
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Incorrect password",
      });
      return;
    }
    const token = jwt.sign(
      { userMobileNo , role:isExist.role},
      process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh",
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message:`${isExist.role} signed in` ,
      token: token,
    });
    console.log(`Amin ${isExist.userName} signed in`)
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
  }
};