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
exports.deleteUniversity = exports.addNewUniversity = exports.getUniversity = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUniversity = (req, res) => {
    res.json({
        message: "Hello From University controller",
    });
};
exports.getUniversity = getUniversity;
// Creates A New University 🖣
const addNewUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, zipcode, latitude, longitude, category, description, universityLogo, userCount, } = req.body;
    try {
        if (!name ||
            name.trim() === "" ||
            !address ||
            address.trim() === "" ||
            !zipcode ||
            !latitude ||
            !longitude ||
            !category ||
            category.trim() === "" ||
            !description ||
            description.trim() === "" ||
            !universityLogo ||
            universityLogo.trim() === "" ||
            !userCount ||
            userCount === null) {
            res.status(400).json({
                message: "All fields are required!",
            });
            return;
        }
    }
    catch (error) {
        res.json({
            message: "Error in field validation check the data",
        });
    }
    try {
        const isAlreadyExist = yield prisma.university.findMany({
            where: {
                name,
            },
        });
        if (isAlreadyExist.length > 0) {
            res.status(400).json({
                message: "University Already exist !",
            });
            return;
        }
        const newUniversity = yield prisma.university.create({
            data: {
                name,
                address,
                zipcode,
                latitude,
                longitude,
                category,
                description,
                universityLogo,
                userCount,
            },
        });
        if (!newUniversity) {
            res.status(400).json({
                message: "Failed to create university",
            });
            return;
        }
        res.status(200).json({
            message: `Successfully Added new ${category.toUpperCase()}`,
            newUniversity,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err,
        });
    }
});
exports.addNewUniversity = addNewUniversity;
// Deletes a  University 🖣
const deleteUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (!name || name.trim() === "") {
            res.status(400).json({
                message: "All fields are required !",
            });
            return;
        }
    }
    catch (error) {
        console.log(`Error in validating field : ${error}`);
        return;
    }
    try {
        const isExist = yield prisma.university.findFirst({
            where: {
                name,
            },
        });
        if (!isExist) {
            res.status(400).json({
                message: "University does not exist",
            });
            return;
        }
        const result = yield prisma.university.delete({
            where: {
                name,
            },
        });
        if (!result) {
            res.status(400).json({
                message: `Failed to delete ${name}`,
            });
            return;
        }
        res.json({
            message: `Succesfully deleted ${name}`,
            result,
        });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res.status(400).json({
            message: err.message,
        });
    }
});
exports.deleteUniversity = deleteUniversity;
