import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUniversity = (req: Request, res: Response) => {
  res.json({
    message: "Hello From University controller",
  });
};

// Creates A New University 🖣

export const addNewUniversity = async (req: Request, res: Response) => {
  const {
    name,
    address,
    zipcode,
    latitude,
    longitude,
    category,
    description,
    universityLogo,
    userCount,    
  } = req.body;

  try {
    if (
      !name ||
      name.trim() === "" ||
      !address ||
      address.trim() === "" ||
      !zipcode ||
      !latitude ||
      !longitude ||
      !category ||
      category.trim() === "" ||
      !description ||
      description.trim() === "" ||
      !universityLogo ||
      universityLogo.trim() === "" ||
      !userCount ||
      userCount === null 
    ) {
      res.status(400).json({
        message: "All fields are required!",
      });
      return;
    }
  } catch (error) {
    res.json({
      message: "Error in field validation check the data",
    });
  }
  try {
    const isAlreadyExist = await prisma.university.findMany({
      where: {
        name,
      },
    });
    if (isAlreadyExist.length > 0) {
      res.status(400).json({
        message: "University Already exist !",
      });
      return;
    }
    const newUniversity = await prisma.university.create({
      data: {
        name,
        address,
        zipcode,
        latitude,
        longitude,
        category,
        description,
        universityLogo,
        userCount,
        
      },
    });
    if (!newUniversity) {
      res.status(400).json({
        message: "Failed to create university",
      });
      return;
    }
    res.status(200).json({
      message: `Successfully Added new ${category.toUpperCase()}`,
      newUniversity,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err,
    });
  }
};

// Deletes a  University 🖣

export const deleteUniversity = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    if (!name || name.trim() === "") {
      res.status(400).json({
        message: "All fields are required !",
      });
      return;
    }
  } catch (error) {
    console.log(`Error in validating field : ${error}`);
    return;
  }
  try {
    const isExist = await prisma.university.findFirst({
      where: {
        name,
      },
    });
    if (!isExist) {
      res.status(400).json({
        message: "University does not exist",
      });
      return;
    }
    const result = await prisma.university.delete({
      where: {
        name,
      },
    });
    if (!result) {
      res.status(400).json({
        message: `Failed to delete ${name}`,
      });
      return;
    }
    res.json({
      message: `Succesfully deleted ${name}`,
      result,
    });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};
