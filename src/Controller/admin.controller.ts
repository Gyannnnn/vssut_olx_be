require('dotenv').config()
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";


// Fetches all admins existed on data base 🖣
export const getAllAdmins = async(req: Request, res: Response)=>{
  try {
    const allAdmins = await prisma.admin.findMany()
    if(!allAdmins){
      res.status(400).json({
        message: "Failed to Find Admins try again"
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
  const { adminName, adminEmail, adminMobileNo, adminAddress, adminPassword } =
    req.body;

  if (
    !adminName?.trim() ||
    !adminEmail?.trim() ||
    !adminMobileNo?.trim() ||
    !adminAddress?.trim() ||
    !adminPassword?.trim()
  ) {
    res.status(400).json({
      message: "All fields are required !",
    });
    return;
  }
  try {
    const isExist = await prisma.admin.findFirst({
      where: {
        adminEmail,
      },
    });
    if (isExist) {
      res.json({
        message: "Admin already exist try signing in",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        adminPassword: hashedPassword,
        adminEmail,
        adminMobileNo,
        adminAddress,
        adminName,
      },
    });
    if (!newAdmin) {
      res.status(400).json({
        message: "Failed to create admin",
      });
      return;
    }
    res.status(201).json({
      message: "Successfully admin created",
      "New Admin": newAdmin,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: "Failed to create admin",
      "Error Message": err.message,
    });
  }
};

// Admin sign in 🖣

export const adminSignin = async (req: Request, res: Response) => {
  const { adminEmail, adminPassword } = req.body;
  if (!adminEmail?.trim() || !adminPassword?.trim()) {
    res.status(400).json({
      message: "All fields are required !",
    });
    return;
  }
  try {
    const isAdminExist = await prisma.admin.findFirst({
      where: {
        adminEmail,
      },
    });
    if (!isAdminExist) {
      res.status(400).json({
        message: "Admin does not exists !",
      });
      return;
    }
    const comparedPassword = bcrypt.compare(
      adminPassword,
      isAdminExist.adminPassword
    );
    if (!comparedPassword) {
      res.status(400).json({
        message: "Incorrect Password ",
      });
      return;
    }
    const adminToken = jwt.sign(
      { adminEmail },
      process.env.JWT_ADMIN_SECRET as string,
      { expiresIn: "1hr" }
    );
    
    res.status(201).json({
      message: "User Signed in successfully",
      "Admin Token": adminToken,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: "Something Went wrong",
      "Error Message": err.message,
    });
  }
};

// Deleted an admin when admin_id is given on the parameter  🖣

export const deleteAdmin = async(req:Request,res: Response)=>{
  const {admin_id} = req.params
  if(!admin_id?.trim()){
    res.status(400).json({
      message: "All fields are required"
    });
    return;
  }
  try {
    const isExist = await prisma.admin.findFirst({
      where:{
        admin_id
      }
    });
    if(!isExist){
      res.status(400).json({
        message: "Admin does not exist"
      });
      return;
    }
    const deletedAdmin = await prisma.admin.delete({
      where:{
        admin_id
      }
    });
    if(!deleteAdmin){
      res.status(400).json({
        message: " Failed to delete Admin "
      });
      return
    }
    res.status(201).json({
      message: "Admin deleted Successfully",
      "Delted Admin":deletedAdmin
    })
  } catch (error) {
    const err = error as Error
    res.status(400).json({
      message: "Failed To delete the message",
      "Error Message":err.message
    })
  }
}