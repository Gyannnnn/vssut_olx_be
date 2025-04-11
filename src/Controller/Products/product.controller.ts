import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.products.findMany();
    if (!allProducts || allProducts.length === 0) {
      res.status(200).json({
        message: "No products  found",
      });
      return;
    }
    res.status(200).json({
      message: "Products fetched successfully",
      allProducts,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      message: err.message,
    });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const {
    user_id,
    university_id,
    title,
    description,
    price,
    category,
    condition,
    imageUrl,   
    imageUrl2,
    imageUrl3,
  } = req.body;

  try {
    if (
        !user_id?.trim() ||
        !university_id?.trim() ||
        !title?.trim() ||
        !description?.trim() ||
        !price ||
        !category?.trim() ||
        !condition?.trim() ||
        !imageUrl?.trim()
      ) {
        res.status(400).json({
          message: "All fields are required !",
        });
        return;
      }
  } catch (error) {
    const err = error as Error
    res.status(400).json({
        mesage: err.message
    })
    return;
  }

  try {
    const newProduct = await prisma.products.create({
        data: {
          title,
          description,
          price,
          category,
          condition,
          imageUrl,
          imageUrl2,
          imageUrl3,
          university: {
            connect: {
              university_id: university_id,
            },
          },
          user: {
            connect: {
              user_id: user_id,
            },
          },
        },
      });
    if (!newProduct) {
      res.status(400).json({
        message: "Failed to add product try again",
      });
      return;
    } else {
      res.json({
        message: "Product added successfully",
        newProduct,
      });
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
  }
};
