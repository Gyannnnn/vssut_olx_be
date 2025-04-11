"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter = (0, express_1.Router)();
const product_controller_1 = require("../../Controller/Products/product.controller");
const product_controller_2 = require("../../Controller/Products/product.controller");
productRouter.get("/all", product_controller_1.getAllProducts);
productRouter.post("/add", product_controller_2.addProduct);
exports.default = productRouter;
