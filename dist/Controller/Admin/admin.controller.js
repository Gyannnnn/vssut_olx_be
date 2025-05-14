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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSignIn = exports.removeAdmin = exports.createAdmin = exports.getAllAdmins = void 0;
require('dotenv').config();
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Fetches all admins existed on data base 🖣
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAdmins = yield prisma.user.findMany({
            where: {
                role: "ADMIN"
            }
        });
        if (!allAdmins || allAdmins.length === 0) {
            res.status(400).json({
                message: "No admins found"
            });
            return;
        }
        res.status(201).json({
            message: "Successfully fetched all admins",
            allAdmins
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Something Went wrong try again",
            "Error message": err.message
        });
    }
});
exports.getAllAdmins = getAllAdmins;
// creates a new admin 🖣
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!(user_id === null || user_id === void 0 ? void 0 : user_id.trim())) {
        res.status(400).json({
            message: "User id required"
        });
    }
    try {
        const student = yield prisma.user.findFirst({
            where: {
                user_id
            }
        });
        if (!student) {
            res.status(404).json({
                message: "No user found !"
            });
            return;
        }
        if (student.role === "ADMIN") {
            res.status(409).json({
                message: `${student.userName} is already an Admin`
            });
            return;
        }
        yield prisma.user.update({
            where: {
                user_id
            },
            data: {
                role: "ADMIN"
            }
        });
        res.status(200).json({
            message: `${student.userName} appointed as admin`
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
exports.createAdmin = createAdmin;
// Deleted an admin when admin_id is given on the parameter  🖣
const removeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!(user_id === null || user_id === void 0 ? void 0 : user_id.trim())) {
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }
    try {
        const admin = yield prisma.user.findFirst({
            where: {
                user_id,
                role: "ADMIN"
            }
        });
        if (!admin) {
            res.status(404).json({
                message: "No admin found !"
            });
            return;
        }
        yield prisma.user.update({
            where: {
                user_id,
                role: "ADMIN"
            },
            data: {
                role: "STUDENT"
            }
        });
        res.status(200).json({
            messsage: `${admin.userName} terminated from admin position`
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
exports.removeAdmin = removeAdmin;
const adminSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userMobileNo, password } = req.body;
    if (!(userMobileNo === null || userMobileNo === void 0 ? void 0 : userMobileNo.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const isExist = yield prisma.user.findFirst({
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
        const isPasswordValid = yield bcryptjs_1.default.compare(password, isExist.hashedPassword);
        if (!isPasswordValid) {
            res.status(400).json({
                message: "Incorrect password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userMobileNo, role: isExist.role }, process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh", { expiresIn: "24h" });
        res.status(201).json({
            message: `${isExist.role} signed in`,
            token: token,
        });
        console.log(`Amin ${isExist.userName} signed in`);
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
    }
});
exports.adminSignIn = adminSignIn;
