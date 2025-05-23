"use strict";
//Package imports 🖣
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// File imports 🖣
const university_routes_1 = __importDefault(require("./Routes/University/university.routes"));
const user_routes_1 = __importDefault(require("./Routes/User/user.routes"));
const admin_routes_1 = __importDefault(require("./Routes/Admin/admin.routes"));
const superadmin_routes_1 = __importDefault(require("./Routes/Super Admin/superadmin.routes"));
const product_routes_1 = __importDefault(require("./Routes/Product/product.routes"));
// Middlewares 🖣
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes 🖣
app.get("/", (req, res) => {
    res.json({
        "Welcome": "Welcome to Vssut OLX  Api."
    });
});
// Middleware Routes 🖣
app.use("/api/v1/university", university_routes_1.default);
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/admin", admin_routes_1.default);
app.use("/api/v1/superadmin", superadmin_routes_1.default);
app.use("/api/v1/products", product_routes_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
});
