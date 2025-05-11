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
exports.approveProduct = exports.notApprovedProducts = exports.approvedProducts = exports.getProductsByCondition = exports.getProductsByCategory = exports.removeProduct = exports.addProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = req.params;
    if (!product_id) {
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
        const productDeleted = yield prisma.products.deleteMany({
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
    }
    catch (error) {
        const err = error;
        message: err.message;
    }
});
exports.removeProduct = removeProduct;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params;
    if (!category) {
        res.status(400).json({
            message: "category field required",
        });
        return;
    }
    try {
        const productsByCategory = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getProductsByCondition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { condition } = req.params;
    if (!(condition === null || condition === void 0 ? void 0 : condition.trim())) {
        res.status(400).json({
            message: "Product condition is required",
        });
        return;
    }
    const productCondition = condition.toUpperCase();
    const validProductEnumTypes = Object.values(client_1.$Enums.ProductCatagory);
    if (!validProductEnumTypes.includes(productCondition)) {
        res.status(400).json({
            message: `Invlid product condition: ${condition} , NEW || OLD`,
        });
        return;
    }
    try {
        const products = yield prisma.products.findMany({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.getProductsByCondition = getProductsByCondition;
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
