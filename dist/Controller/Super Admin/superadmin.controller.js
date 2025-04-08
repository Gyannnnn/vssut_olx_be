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
require('dotenv').config();
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// creates a superadmin  🖣
const createSuperAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { superAdminName, superAdminEmail, superAdminPassword, superAdminAvatar, superAdminMobile } = req.body;
    if (!(superAdminName === null || superAdminName === void 0 ? void 0 : superAdminName.trim()) || !(superAdminEmail === null || superAdminEmail === void 0 ? void 0 : superAdminEmail.trim()) || !(superAdminPassword === null || superAdminPassword === void 0 ? void 0 : superAdminPassword.trim()) || !(superAdminAvatar === null || superAdminAvatar === void 0 ? void 0 : superAdminAvatar.trim()) || !(superAdminMobile === null || superAdminMobile === void 0 ? void 0 : superAdminMobile.trim())) {
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }
    try {
        const isExist = yield prisma.superAdmin.findFirst({
            where: {
                superAdminEmail,
            }
        });
        if (isExist) {
            res.status(400).json({
                message: "Super admin already exist"
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(superAdminPassword, 10);
        const newSuperAdmin = yield prisma.superAdmin.create({
            data: {
                superAdminName,
                superAdminEmail,
                superAdminPassword: hashedPassword,
                superAdminAvatar,
                superAdminMobileNo: superAdminMobile
            }
        });
        if (!newSuperAdmin) {
            res.status(400).json({
                message: "Failed to create super admin"
            });
            return;
        }
        else {
            res.status(201).json({
                message: "Super Admin created successfully",
                newSuperAdmin
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message
        });
    }
});
exports.createSuperAdmin = createSuperAdmin;
// 🖣 Super admin signin
const superAdminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { superAdminEmail, superAdminPassword } = req.body;
    if (!(superAdminEmail === null || superAdminEmail === void 0 ? void 0 : superAdminEmail.trim()) || !(superAdminPassword === null || superAdminPassword === void 0 ? void 0 : superAdminPassword.trim())) {
        res.status(400).json({
            message: "All fields required"
        });
        return;
    }
    try {
        const isExist = yield prisma.superAdmin.findFirst({
            where: {
                superAdminEmail
            }
        });
        if (!isExist) {
            res.status(400).json({
                message: "Super admin does not exist"
            });
            return;
        }
        const verfiedPassword = bcryptjs_1.default.compare(superAdminPassword, isExist.superAdminPassword);
        if (!verfiedPassword) {
            res.status(400).json({
                message: "Incorrect password"
            });
            return;
        }
        else {
            const token = jsonwebtoken_1.default.sign({ superAdminEmail }, process.env.JWT_SUPER_ADMIN_SECRET, { expiresIn: "1hr" });
            res.status(201).json({
                message: "Super user signed in successfully",
                token: token
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            errorMessage: err.message
        });
    }
});
exports.superAdminSignin = superAdminSignin;
