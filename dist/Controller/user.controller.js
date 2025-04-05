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
exports.deleteUser = exports.updateUser = exports.signIn = exports.signUp = exports.getAllUsers = void 0;
require("dotenv").config();
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// It finds all Signed up users and returns the array of users 🖣
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        if (!allUsers || allUsers.length === 0) {
            res.status(400).json({
                message: "No users exist !",
            });
            return;
        }
        res.status(200).json({
            users: allUsers,
        });
    }
    catch (error) {
        const err = error;
        res.json({
            message: err.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
// User signup/creates  🖣
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userEmail, userMobileNo, password, userUniversityId } = req.body;
    if (!(userName === null || userName === void 0 ? void 0 : userName.trim()) ||
        !(userEmail === null || userEmail === void 0 ? void 0 : userEmail.trim()) ||
        !(userMobileNo === null || userMobileNo === void 0 ? void 0 : userMobileNo.trim()) ||
        !(password === null || password === void 0 ? void 0 : password.trim()) ||
        !(userUniversityId === null || userUniversityId === void 0 ? void 0 : userUniversityId.trim())) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const isExist = yield prisma.user.findFirst({
            where: {
                userMobileNo,
            },
        });
        if (isExist) {
            res.status(400).json({
                message: "user already exist try signing in",
            });
            return;
        }
        const userUniversity = yield prisma.university.findFirst({
            where: {
                university_id: userUniversityId
            }
        });
        const newUser = yield prisma.user.create({
            data: {
                userName,
                userEmail,
                hashedPassword,
                userMobileNo,
                userUniversity: {
                    connect: { university_id: userUniversityId },
                },
                userUniversityName: userUniversity === null || userUniversity === void 0 ? void 0 : userUniversity.name
            },
        });
        const token = jsonwebtoken_1.default.sign({ userMobileNo }, process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh", { expiresIn: "24h" });
        if (!newUser) {
            res.status(400).json({
                message: "Failed to create user",
            });
            return;
        }
        res.status(201).json({
            message: "Successfully created user",
            user: newUser,
            token: token,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.signUp = signUp;
//  User sign in  🖣
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = jsonwebtoken_1.default.sign({ userMobileNo }, process.env.JWT_SECRET || "ihqvu9eirhgiuvhwou8rehg89uh3yrwhquighreuigh", { expiresIn: "24h" });
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
exports.signIn = signIn;
// Updates a user {user name, user email , user university}  🖣
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userEmail, userMobileNo, userUniversityId } = req.body;
    if (!(userName === null || userName === void 0 ? void 0 : userName.trim()) ||
        !(userEmail === null || userEmail === void 0 ? void 0 : userEmail.trim()) ||
        !(userMobileNo === null || userMobileNo === void 0 ? void 0 : userMobileNo.trim()) ||
        !(userUniversityId === null || userUniversityId === void 0 ? void 0 : userUniversityId.trim())) {
        res.status(400).json({ message: "All fields are required!" });
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
                message: "User does not exist",
            });
            return;
        }
        const updatedUser = yield prisma.user.update({
            where: {
                userMobileNo,
            },
            data: {
                userName,
                userEmail,
                userMobileNo,
                userUniversity: {
                    connect: { university_id: userUniversityId },
                },
            },
        });
        if (!exports.updateUser) {
            res.status(400).json({
                message: "Failed to update . Try again"
            });
            return;
        }
        res.status(201).json({
            message: "User Updated Succssfully",
            user: updatedUser
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message
        });
    }
});
exports.updateUser = updateUser;
// Deletes a user by its user id sent in params 🖣
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        const isExist = yield prisma.user.findFirst({
            where: {
                user_id
            }
        });
        if (!isExist) {
            res.status(400).json({
                message: "User does not exist"
            });
            return;
        }
        const deletedUser = yield prisma.user.delete({
            where: {
                user_id
            }
        });
        if (!exports.deleteUser) {
            res.status(400).json({
                message: "Failed to delete the user"
            });
            return;
        }
        res.status(400).json({
            message: "User deleted successfully",
            deleteduser: deletedUser
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Failed to delete the user",
            Error: err.message
        });
    }
});
exports.deleteUser = deleteUser;
