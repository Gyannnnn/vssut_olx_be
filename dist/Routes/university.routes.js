"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const universityRouter = (0, express_1.Router)();
// file imports 🖣
const university_controller_1 = require("../Controller/university.controller");
const university_controller_2 = require("../Controller/university.controller");
// Routes 🖣
universityRouter.get("/", university_controller_1.getUniversity);
universityRouter.post("/add", university_controller_2.addNewUniversity);
// Export 🖣
exports.default = universityRouter;
