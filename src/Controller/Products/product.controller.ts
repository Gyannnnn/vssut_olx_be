import { PrismaClient, $Enums } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.products.findMany();
    if (!allProducts || allProducts.length === 0) {
      res.status(404).json({
        message: "no products found",
      });
      return;
    }
    res.status(200).json({
      message: "Products fetched successfully",
      allProducts,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
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
    const err = error as Error;
    res.status(400).json({
      mesage: err.message,
    });
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

export const removeProduct = async (req: Request, res: Response) => {
  const product_id = req.params;
  if (!product_id) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const isProductExists = await prisma.products.findFirst({
      where: {
        product_id: product_id,
      },
    });
    if (!isProductExists) {
      res.status(400).json({
        message: "Product not found",
      });
      return;
    }
    const productDeleted = await prisma.products.deleteMany({
      where: {
        product_id,
      },
    });
    if (!productDeleted) {
      res.status(400).json({
        message: "Failed to delete",
      });
      return;
    }
    res.status(200).json({
      message: `${productDeleted} deleted`,
    });
  } catch (error) {
    const err = error as Error;
    message: err.message;
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const category = req.params;
  if (!category) {
    res.status(400).json({
      message: "category field required",
    });
    return;
  }

  try {
    const productsByCategory = await prisma.products.findMany({
      where: {
        category,
        isApproved: true,
      },
    });
    if (!productsByCategory) {
      res.status(404).json({
        message: `products of ${category} not found`,
      });
      return;
    }
    res.status(200).json({
      products: productsByCategory,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProductsByCondition = async (req: Request, res: Response) => {
  const { condition } = req.params;

  if (!condition?.trim()) {
    res.status(400).json({
      message: "Product condition is required",
    });
    return;
  }
  const productCondition = condition.toUpperCase() as $Enums.ProductCatagory;
  const validProductEnumTypes = Object.values($Enums.ProductCatagory);
  if (!validProductEnumTypes.includes(productCondition)) {
    res.status(400).json({
      message: `Invlid product condition: ${condition} , NEW || OLD`,
    });
    return;
  }

  try {
    const products = await prisma.products.findMany({
      where: {
        category: productCondition,
        isApproved: true,
      },
    });
    if (!products || products.length === 0) {
      res.status(404).json({
        message: `Products not found of ${condition} condition`,
      });
      return;
    }
    res.status(200).json({
      message: "Successfully fetched products",
      products,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

export const approvedProducts = async (req: Request, res: Response) => {
  try {
    const approvedProducts = await prisma.products.findMany({
      where: {
        isApproved: true,
      },
    });
    if (!approvedProducts || approvedProducts.length === 0) {
      res.status(404).json({
        message: "No approved products found",
      });
      return;
    }
    res.status(200).json({
      message: "Fetched approved products succesfully",
      approvedProducts,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

export const notApprovedProducts = async (req: Request, res: Response) => {
  try {
    const notApprovedProducts = await prisma.products.findMany({
      where: {
        isApproved: false,
      },
    });
    if (!notApprovedProducts || notApprovedProducts.length === 0) {
      res.status(404).json({
        message: "No not approved products found",
      });
      return;
    }
    res.status(200).json({
      message: "Fetched not approved products succesfully",
      notApprovedProducts,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};

export const approveProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  if (!product_id?.trim()) {
    res.status(400).json({
      message: "product id is required",
    });
    return;
  }
  try {
    await prisma.products.update({
      where: {
        product_id,
      },
      data: {
        isApproved: true,
      },
    });
    res.json({
      message: "Product approved",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Failed to approve",
      error: err.message,
    });
  }
};
