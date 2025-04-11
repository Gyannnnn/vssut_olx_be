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
exports.addProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.products.findMany();
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
    }
    catch (error) {
        const err = error;
        res.json({
            message: err.message,
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
            mesage: err.message
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
