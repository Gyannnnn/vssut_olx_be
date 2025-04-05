require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    if (!allUsers || allUsers.length === 0) {
      res.status(400).json({
        message: "No users exist !",
      });
      return;
    }
    res.status(200).json({
      users: allUsers,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      message: err.message,
    });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { userName, userEmail, userMobileNo, password, userUniversityId } =
    req.body;
  if (
    !userName?.trim() ||
    !userEmail?.trim() ||
    !userMobileNo?.trim() ||
    !password?.trim() ||
    !userUniversityId?.trim()
  ) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await prisma.user.findFirst({
      where: {
        userMobileNo,
      },
    });
    if (isExist) {
      res.status(400).json({
        message: "user already exist try signing in",
      });
      return;
    }
    const newUser = await prisma.user.create({
      data: {
        userName,
        userEmail,
        hashedPassword,
        userMobileNo,
        userUniversity: {
          connect: { university_id: userUniversityId },
        },
      },
    });
    const token = jwt.sign(
      { userMobileNo },
      process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh",
      { expiresIn: "24h" }
    );
    if (!newUser) {
      res.status(400).json({
        message: "Failed to create user",
      });
      return;
    }
    res.status(201).json({
      message: "Successfully created user",
      user: newUser,
      token: token,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
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
      { userMobileNo },
      process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh",
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "User signed in",
      token: token,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userName, userEmail, userMobileNo, userUniversityId } =
    req.body;
  if (
    !userName?.trim() ||
    !userEmail?.trim() ||
    !userMobileNo?.trim() ||    
    !userUniversityId?.trim()
  ) {
    res.status(400).json({ message: "All fields are required!" });
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
        message: "User does not exist",
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        userMobileNo,
      },
      data: {
        userName,
        userEmail,
        userMobileNo,
        userUniversity: {
          connect: { university_id: userUniversityId },
        },
      },
    });
    if(!updateUser){
        res.status(400).json({
            message: "Failed to update . Try again"
        });
        return;
    }
    res.status(201).json({
        message: "User Updated Succssfully",
        user: updatedUser
    })
  } catch (error) {
    const err = error as Error
    res.status(400).json({
        message: err.message
    })
  }
};


export const deleteUser = async(req: Request, res: Response)=>{
    const{user_id} = req.params
    try {
        const isExist = await prisma.user.findFirst({
            where:{
                user_id
            }
        });
        if(!isExist){
            res.status(400).json({
                message: "User does not exist"
            });
            return;
        }
        const deletedUser = await prisma.user.delete({
            where:{
                user_id
            }
        })
        if(!deleteUser){
            res.status(400).json({
                message: "Failed to delete the user"
            });
            return;
        }
        res.status(400).json({
            message: "User deleted successfully",
            deleteduser:deletedUser
        })

    } catch (error) {
        const err = error as Error
        res.status(400).json({
            message: "Failed to delete the user",
            Error: err.message
        });
        
    }
}