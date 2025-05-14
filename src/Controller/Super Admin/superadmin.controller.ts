require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// creates a superadmin  🖣

export const createSuperAdmin = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  if (!user_id?.trim()) {
    res.status(400).json({
      message: "all fields are required",
    });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        user_id,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "No user found !",
      });
      return;
    }
    if (user.role === "SUPERADMIN") {
      res.status(409).json({
        message: "Already super admin",
      });
      return;
    }
    await prisma.user.update({
      where: {
        user_id,
      },
      data: {
        role: "SUPERADMIN",
      },
    });
    res.status(200).json({
      message: `${user.userName} is appointed as Super admin`,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// 🖣 Super admin signin
export const superAdminSignin = async (req: Request, res: Response) => {
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
      { userMobileNo, role: isExist.role },
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
