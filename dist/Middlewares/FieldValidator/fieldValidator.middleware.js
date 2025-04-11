"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidator = void 0;
const fieldValidator = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            const value = req.body[field];
            if (value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")) {
                return res.status(400).json({
                    message: `${field} is required and cannot be empty`,
                });
            }
        }
        next();
    };
};
exports.fieldValidator = fieldValidator;
