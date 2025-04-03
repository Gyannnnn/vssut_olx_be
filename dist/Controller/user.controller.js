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
exports.signUp = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        if (!allUsers || allUsers.length === 0) {
            res.status(400).json({
                message: "No users exist !"
            });
            return;
        }
        res.status(200).json({
            users: allUsers
        });
    }
    catch (error) {
        const err = error;
        res.json({
            message: err.message
        });
    }
});
exports.getAllUsers = getAllUsers;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userEmail, userMobileNo, password } = req.body;
    if (!userName || userName.trim() === "", !userEmail || userEmail.trim() === "" || !userMobileNo || userMobileNo.trim() === "" || !password || password.trim() === "") {
        res.status(400).json({
            message: "All fields are required !"
        });
        return;
    }
});
exports.signUp = signUp;
