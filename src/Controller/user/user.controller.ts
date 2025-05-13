require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// It finds all Signed up users and returns the array of users 🖣

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

// User signup/creates  🖣

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
    const userUniversity = await prisma.university.findFirst({
        where:{
            university_id:userUniversityId
        }
    });

    const newUser = await prisma.user.create({
      data: {
        userName,
        userEmail,
        hashedPassword,
        userMobileNo,
        userUniversity: {
          connect: { university_id: userUniversityId },
        },
        userUniversityName:userUniversity?.name as string
        
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

//  User sign in  🖣

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

// Updates a user {user name, user email , user university}  🖣

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

// Deletes a user by its user id sent in params 🖣

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

// fetch user orders , user authentication required 🖣

export const userOrders = async(req:Request,res:Response)=>{
  const {user_id} = req.params
  if(!user_id?.trim()){
    res.status(400).json({
      message: "All fields are required"
    })
  }
  try {
    const user = await prisma.user.findFirst({
      where:{
        user_id:user_id
      }
    })
    if(!user){
      res.status(400).json({
        message: "No users exists try signining up"
      });
      return;
    }
    const orders = await prisma.orders.findMany({
      where:{
        user_id:user_id
      }
    });
    if(!orders || orders.length === 0){
      res.status(404).json({
        message:"No orders placed by user"
      });
      return
    }
    res.status(200).json({
      message: "orders fetched successfully",
      orders
    })
  } catch (error) {
    const err  = error as Error
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    })
    
  }
}

// fetch user profile, user authentication required 🖣

export const userProfile = async(req: Request,res: Response)=>{
  const {user_id} = req.params
  if(!user_id?.trim()){
    res.status(400).json({
      message: "All fields are required"
    })
  }
  try {
    const user = await prisma.user.findFirst({
      where:{
        user_id
      }
    })
    if(!user){
      res.status(404).json({
        message: "No users found try signing up"
      });
      return      
    }
    const profile = await prisma.user.findFirst({
      where:{
        user_id:user_id
      },
      include: {
        userPurchases: true,
        userCart: true,
        userProducts: true,
        userServices: true,
        userOrders: true,
        buyerTransactions: true,
        sellerTransactions: true,
        userUniversity: true,
      }
    })
    if(!profile){
      res.status(404).json({
        message: "Nothing found" 
      });
      return
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      profile:profile
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    })
    
  }
}