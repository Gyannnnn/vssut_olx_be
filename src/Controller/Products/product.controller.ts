import { PrismaClient, $Enums } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// get all products admin validation required
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

// adds a new product to the database
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

// removes a product from the database
export const removeProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  if (!product_id?.trim()) {
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
    const productDeleted = await prisma.products.delete({
      where: {
        product_id,
      },
    });
    console.log(productDeleted);

    if (!productDeleted) {
      res.status(400).json({
        message: "Failed to delete",
      });
      return;
    }
    res.status(200).json({
      message: `${productDeleted.title} deleted`,
    });
  } catch (error) {
    const err = error as Error;
    message: err.message;
  }
};

// fetch all products of a specific category
export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  if (!category?.trim()) {
    res.status(400).json({
      message: "category field required",
    });
    return;
  }
  const productCategory = category.toUpperCase() as $Enums.ProductCatagory;
  const validProductCategory = Object.values($Enums.ProductCatagory);
  if (!validProductCategory.includes(productCategory)) {
    res.status(400).json({
      message: "invalid category",
    });
  }

  try {
    const productsByCategory = await prisma.products.findMany({
      where: {
        category: productCategory,
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

// fetch all product of specific condition
export const getProductsByCondition = async (req: Request, res: Response) => {
  const { condition } = req.params;

  if (!condition?.trim()) {
    res.status(400).json({
      message: "Product condition is required",
    });
    return;
  }
  const productCondition = condition.toUpperCase() as $Enums.ProductCondition;
  const validProductEnumTypes = Object.values($Enums.ProductCondition);
  if (!validProductEnumTypes.includes(productCondition)) {
    res.status(400).json({
      message: `Invalid product condition: ${condition} , NEW || USED`,
    });
    return;
  }

  try {
    const products = await prisma.products.findMany({
      where: {
        condition: productCondition,
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

// fetch all approved products , no admin validation, public route
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

// fetch not approved products admin validation required

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

// approve a product to show in main frontend FALSE->TRUE

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

// fetch a product by product id

export const getProductById = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  if (!product_id?.trim()) {
    res.status(400).json({
      message: "Product id is required",
    });
    return;
  }
  try {
    const product = await prisma.products.findFirst({
      where: {
        product_id,
      },
      include: {
        reviews: true,
        university: true,
      },
    });
    if (!product) {
      res.status(404).json({
        message: "No product found",
      });
      return;
    }
    res.status(200).json({
      message: "Product fetched",
      product,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// fetch products by university/university id

export const getProductsByUniversity = async (req: Request, res: Response) => {
  const { university_id } = req.params;
  if (!university_id?.trim()) {
    res.status(400).json({
      message: "university_id required",
    });
    return;
  }

  try {
    const university = await prisma.university.findFirst({
      where: {
        university_id,
      },
      include: {
        products: true,
      },
    });
    if (!university) {
      res.status(404).json({
        message: "University not exist",
      });
      return;
    }

    res.status(200).json({
      message: `product fetched from ${university.name}`,
      products: university.products,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// fetch products by user/user_id , admin auth required


export const getProductsByUser = async(req:Request,res:Response)=>{
  const {user_id} = req.params
  if(!user_id?.trim()){
    res.status(400).json({
      message: "user id is required"
    });
    return
  }

  try {
    const user = await prisma.user.findFirst({
      where:{
        user_id
      },
      include:{
        userProducts:true
      }
    })
    if(!user){
      res.status(404).json({
        messge:"no user found"
      })
      return
    }
    res.status(200).json({
      message:`product of ${user.userName} fetched successfullly`,
      userProducts:user.userProducts
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message:"Internal server error",
      error:err.message
      
    })
  }
}


// fetch available/ready to deliver  products 


export const getAvailableProducts = async(req: Request,res: Response)=>{
  const {university_id} = req.params
  if(!university_id?.trim()){
    res.status(400).json({
      message: "University id required"
    });
    return
  }

  try {
    const university = await prisma.university.findFirst({
      where:{
        university_id
      }
    })
    if(!university){
      res.status(404).json({
        message:"No university found"
      });
      return;
    }
    const availableProducts = await prisma.products.findMany({
      where:{
        isAvailable:true,
        university_id
      }
    })

    if(!availableProducts||availableProducts.length === 0){
      res.status(404).json({
        message: "No available products"
      });
      return;
    }
    res.status(200).json({
      message: `Available products from ${university.name} fetched`,
      availableProducts
    })

  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: "Internal server error",
      error:err.message
    })
    
  }
}


// make product outofstock

export const outOfStock = async(req: Request,res: Response)=>{
  const {product_id} = req.params
  if(!product_id?.trim()){
    res.status(400).json({
      message: "Product id is required"
    });
    return;
  }
  try {
    const product = await prisma.products.findFirst({
      where:{
        product_id
      }
    })
    if(!product){
      res.status(404).json({
        message: "No product found"
      })
    }
    if(!product?.isAvailable){
      res.status(409).json({
        message: `Product ${product?.title} is already out of stock`
      });
      return;
    }
    await prisma.products.update({
      where:{
        product_id
      },
      data:{
        isAvailable:false
      }
    })
    res.status(200).json({
      message: `Product ${product?.title} is now out of stock`
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: "Internal server error",
      error:err.message
    });
    
  }
}


// make product in stock

export const inStock = async(req: Request, res: Response)=>{
  const {product_id} = req.params
  if(!product_id?.trim()){
    res.status(400).json({
      message: "Product id is required"
    });
    return
  }
  try {
    const product = await prisma.products.findFirst({
      where:{
        product_id
      }
    });
    if(!product){
      res.status(404).json({
        message: "Product does not exist"
      });
      return;
    }
    if(product?.isAvailable){
      res.status(409).json({
        message: `Product ${product.title} already available`
      })
      return;
    }
    await prisma.products.update({
      where:{
        product_id
      },
      data:{
        isAvailable:true
      }
    })

    res.status(200).json({
      message: `Product ${product?.title} is now available`
    })

  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message:"Internal server error",
      error:err.message
    })
  }
}




