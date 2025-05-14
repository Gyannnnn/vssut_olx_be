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
exports.superAdminSignin = exports.createSuperAdmin = void 0;
require("dotenv").config();
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// creates a superadmin  🖣
const createSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    if (!(user_id === null || user_id === void 0 ? void 0 : user_id.trim())) {
        res.status(400).json({
            message: "all fields are required",
        });
        return;
    }
    try {
        const user = yield prisma.user.findFirst({
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
        yield prisma.user.update({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.createSuperAdmin = createSuperAdmin;
// 🖣 Super admin signin
const superAdminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            message: "User signed in",
            token: token,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
    }
});
exports.superAdminSignin = superAdminSignin;
