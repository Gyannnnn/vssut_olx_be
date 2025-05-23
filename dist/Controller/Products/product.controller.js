"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inStock = exports.outOfStock = exports.getAvailableProducts = exports.getProductsByUser = exports.getProductsByUniversity = exports.getProductById = exports.approveProduct = exports.notApprovedProducts = exports.approvedProducts = exports.getProductsByCondition = exports.getProductsByCategory = exports.removeProduct = exports.addProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// get all products admin validation required
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.products.findMany();
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getAllProducts = getAllProducts;
// adds a new product to the database
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, university_id, title, description, price, category, condition, imageUrl, imageUrl2, imageUrl3, } = req.body;
    try {
        if (!(user_id === null || user_id === void 0 ? void 0 : user_id.trim()) ||
            !(university_id === null || university_id === void 0 ? void 0 : university_id.trim()) ||
            !(title === null || title === void 0 ? void 0 : title.trim()) ||
            !(description === null || description === void 0 ? void 0 : description.trim()) ||
            !price ||
            !(category === null || category === void 0 ? void 0 : category.trim()) ||
            !(condition === null || condition === void 0 ? void 0 : condition.trim()) ||
            !(imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.trim())) {
            res.status(400).json({
                message: "All fields are required !",
            });
            return;
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            mesage: err.message,
        });
        return;
    }
    try {
        const newProduct = yield prisma.products.create({
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
        }
        else {
            res.json({
                message: "Product added successfully",
                newProduct,
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
    }
});
exports.addProduct = addProduct;
// removes a product from the database
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    if (!(product_id === null || product_id === void 0 ? void 0 : product_id.trim())) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const isProductExists = yield prisma.products.findFirst({
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
        const productDeleted = yield prisma.products.delete({
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
    }
    catch (error) {
        const err = error;
        message: err.message;
    }
});
exports.removeProduct = removeProduct;
// fetch all products of a specific category
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    if (!(category === null || category === void 0 ? void 0 : category.trim())) {
        res.status(400).json({
            message: "category field required",
        });
        return;
    }
    const productCategory = category.toUpperCase();
    const validProductCategory = Object.values(client_1.$Enums.ProductCatagory);
    if (!validProductCategory.includes(productCategory)) {
        res.status(400).json({
            message: "invalid category",
        });
    }
    try {
        const productsByCategory = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.getProductsByCategory = getProductsByCategory;
// fetch all product of specific condition
const getProductsByCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { condition } = req.params;
    if (!(condition === null || condition === void 0 ? void 0 : condition.trim())) {
        res.status(400).json({
            message: "Product condition is required",
        });
        return;
    }
    const productCondition = condition.toUpperCase();
    const validProductEnumTypes = Object.values(client_1.$Enums.ProductCondition);
    if (!validProductEnumTypes.includes(productCondition)) {
        res.status(400).json({
            message: `Invalid product condition: ${condition} , NEW || USED`,
        });
        return;
    }
    try {
        const products = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.getProductsByCondition = getProductsByCondition;
// fetch all approved products , no admin validation, public route
const approvedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedProducts = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.approvedProducts = approvedProducts;
// fetch not approved products admin validation required
const notApprovedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notApprovedProducts = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.notApprovedProducts = notApprovedProducts;
// approve a product to show in main frontend FALSE->TRUE
const approveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    if (!(product_id === null || product_id === void 0 ? void 0 : product_id.trim())) {
        res.status(400).json({
            message: "product id is required",
        });
        return;
    }
    try {
        yield prisma.products.update({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Failed to approve",
            error: err.message,
        });
    }
});
exports.approveProduct = approveProduct;
// fetch a product by product id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    if (!(product_id === null || product_id === void 0 ? void 0 : product_id.trim())) {
        res.status(400).json({
            message: "Product id is required",
        });
        return;
    }
    try {
        const product = yield prisma.products.findFirst({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getProductById = getProductById;
// fetch products by university/university id
const getProductsByUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { university_id } = req.params;
    if (!(university_id === null || university_id === void 0 ? void 0 : university_id.trim())) {
        res.status(400).json({
            message: "university_id required",
        });
        return;
    }
    try {
        const university = yield prisma.university.findFirst({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getProductsByUniversity = getProductsByUniversity;
// fetch products by user/user_id , admin auth required
const getProductsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!(user_id === null || user_id === void 0 ? void 0 : user_id.trim())) {
        res.status(400).json({
            message: "user id is required"
        });
        return;
    }
    try {
        const user = yield prisma.user.findFirst({
            where: {
                user_id
            },
            include: {
                userProducts: true
            }
        });
        if (!user) {
            res.status(404).json({
                messge: "no user found"
            });
            return;
        }
        res.status(200).json({
            message: `product of ${user.userName} fetched successfullly`,
            userProducts: user.userProducts
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
exports.getProductsByUser = getProductsByUser;
// fetch available/ready to deliver  products 
const getAvailableProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { university_id } = req.params;
    if (!(university_id === null || university_id === void 0 ? void 0 : university_id.trim())) {
        res.status(400).json({
            message: "University id required"
        });
        return;
    }
    try {
        const university = yield prisma.university.findFirst({
            where: {
                university_id
            }
        });
        if (!university) {
            res.status(404).json({
                message: "No university found"
            });
            return;
        }
        const availableProducts = yield prisma.products.findMany({
            where: {
                isAvailable: true,
                university_id
            }
        });
        if (!availableProducts || availableProducts.length === 0) {
            res.status(404).json({
                message: "No available products"
            });
            return;
        }
        res.status(200).json({
            message: `Available products from ${university.name} fetched`,
            availableProducts
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
exports.getAvailableProducts = getAvailableProducts;
// make product outofstock
const outOfStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    if (!(product_id === null || product_id === void 0 ? void 0 : product_id.trim())) {
        res.status(400).json({
            message: "Product id is required"
        });
        return;
    }
    try {
        const product = yield prisma.products.findFirst({
            where: {
                product_id
            }
        });
        if (!product) {
            res.status(404).json({
                message: "No product found"
            });
        }
        if (!(product === null || product === void 0 ? void 0 : product.isAvailable)) {
            res.status(409).json({
                message: `Product ${product === null || product === void 0 ? void 0 : product.title} is already out of stock`
            });
            return;
        }
        yield prisma.products.update({
            where: {
                product_id
            },
            data: {
                isAvailable: false
            }
        });
        res.status(200).json({
            message: `Product ${product === null || product === void 0 ? void 0 : product.title} is now out of stock`
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
exports.outOfStock = outOfStock;
// make product in stock
const inStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    if (!(product_id === null || product_id === void 0 ? void 0 : product_id.trim())) {
        res.status(400).json({
            message: "Product id is required"
        });
        return;
    }
    try {
        const product = yield prisma.products.findFirst({
            where: {
                product_id
            }
        });
        if (!product) {
            res.status(404).json({
                message: "Product does not exist"
            });
            return;
        }
        if (product === null || product === void 0 ? void 0 : product.isAvailable) {
            res.status(409).json({
                message: `Product ${product.title} already available`
            });
            return;
        }
        yield prisma.products.update({
            where: {
                product_id
            },
            data: {
                isAvailable: true
            }
        });
        res.status(200).json({
            message: `Product ${product === null || product === void 0 ? void 0 : product.title} is now available`
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
exports.inStock = inStock;
