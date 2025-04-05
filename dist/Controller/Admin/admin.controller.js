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
exports.deleteAdmin = exports.adminSignin = exports.createAdmin = exports.getAllAdmins = void 0;
require('dotenv').config();
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Fetches all admins existed on data base 🖣
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAdmins = yield prisma.admin.findMany();
        if (!allAdmins) {
            res.status(400).json({
                message: "Failed to Find Admins try again"
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
    const { adminName, adminEmail, adminMobileNo, adminAddress, adminPassword } = req.body;
    if (!(adminName === null || adminName === void 0 ? void 0 : adminName.trim()) ||
        !(adminEmail === null || adminEmail === void 0 ? void 0 : adminEmail.trim()) ||
        !(adminMobileNo === null || adminMobileNo === void 0 ? void 0 : adminMobileNo.trim()) ||
        !(adminAddress === null || adminAddress === void 0 ? void 0 : adminAddress.trim()) ||
        !(adminPassword === null || adminPassword === void 0 ? void 0 : adminPassword.trim())) {
        res.status(400).json({
            message: "All fields are required !",
        });
        return;
    }
    try {
        const isExist = yield prisma.admin.findFirst({
            where: {
                adminEmail,
            },
        });
        if (isExist) {
            res.json({
                message: "Admin already exist try signing in",
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(adminPassword, 10);
        const newAdmin = yield prisma.admin.create({
            data: {
                adminPassword: hashedPassword,
                adminEmail,
                adminMobileNo,
                adminAddress,
                adminName,
            },
        });
        if (!newAdmin) {
            res.status(400).json({
                message: "Failed to create admin",
            });
            return;
        }
        res.status(201).json({
            message: "Successfully admin created",
            "New Admin": newAdmin,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Failed to create admin",
            "Error Message": err.message,
        });
    }
});
exports.createAdmin = createAdmin;
// Admin sign in 🖣
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminEmail, adminPassword } = req.body;
    if (!(adminEmail === null || adminEmail === void 0 ? void 0 : adminEmail.trim()) || !(adminPassword === null || adminPassword === void 0 ? void 0 : adminPassword.trim())) {
        res.status(400).json({
            message: "All fields are required !",
        });
        return;
    }
    try {
        const isAdminExist = yield prisma.admin.findFirst({
            where: {
                adminEmail,
            },
        });
        if (!isAdminExist) {
            res.status(400).json({
                message: "Admin does not exists !",
            });
            return;
        }
        const comparedPassword = bcryptjs_1.default.compare(adminPassword, isAdminExist.adminPassword);
        if (!comparedPassword) {
            res.status(400).json({
                message: "Incorrect Password ",
            });
            return;
        }
        const adminToken = jsonwebtoken_1.default.sign({ adminEmail }, process.env.JWT_ADMIN_SECRET, { expiresIn: "1hr" });
        res.status(201).json({
            message: "User Signed in successfully",
            "Admin Token": adminToken,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Something Went wrong",
            "Error Message": err.message,
        });
    }
});
exports.adminSignin = adminSignin;
// Deleted an admin when admin_id is given on the parameter  🖣
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin_id } = req.params;
    if (!(admin_id === null || admin_id === void 0 ? void 0 : admin_id.trim())) {
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }
    try {
        const isExist = yield prisma.admin.findFirst({
            where: {
                admin_id
            }
        });
        if (!isExist) {
            res.status(400).json({
                message: "Admin does not exist"
            });
            return;
        }
        const deletedAdmin = yield prisma.admin.delete({
            where: {
                admin_id
            }
        });
        if (!exports.deleteAdmin) {
            res.status(400).json({
                message: " Failed to delete Admin "
            });
            return;
        }
        res.status(201).json({
            message: "Admin deleted Successfully",
            "Delted Admin": deletedAdmin
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Failed To delete the message",
            "Error Message": err.message
        });
    }
});
exports.deleteAdmin = deleteAdmin;
