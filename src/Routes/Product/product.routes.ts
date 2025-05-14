import { Router } from "express";
const productRouter = Router();

import {
  getAllProducts,
  removeProduct,
  addProduct,
  getProductsByCategory,
  getProductsByCondition,
  approvedProducts,
  notApprovedProducts,
  approveProduct,
  getProductById,
  getProductsByUniversity,
  getProductsByUser,
  getAvailableProducts,
  outOfStock,
  inStock,
} from "../../Controller/Products/product.controller";

import { adminSuperAdminAuthValidation } from "../../Middlewares/adminSuperAdminAuthMiddleware/admin.superadmin.auth.middleware";
import { student_studentSeller_authValidation } from "../../Middlewares/Student_SudentSeller_Middleware/student.studentseller.auth.middleware";

productRouter.get("/all", adminSuperAdminAuthValidation, getAllProducts);
productRouter.post("/add", addProduct);
productRouter.delete("/del/:product_id", adminSuperAdminAuthValidation, removeProduct);
productRouter.get("/cat/:category", getProductsByCategory);
productRouter.get("/con/:condition", getProductsByCondition);
productRouter.get("/approved", approvedProducts);
productRouter.get(
  "/products/notapproved",
  adminSuperAdminAuthValidation,
  notApprovedProducts
);
productRouter.put("/approve/:product_id", adminSuperAdminAuthValidation, approveProduct);
productRouter.get("/:product_id", getProductById);
productRouter.get("/university/:university_id", getProductsByUniversity);
productRouter.get("/user/:user_id", adminSuperAdminAuthValidation, getProductsByUser);
productRouter.get("/available/:university_id", getAvailableProducts);
productRouter.put("/oos/:product_id", student_studentSeller_authValidation, outOfStock);
productRouter.put("/is/:product_id",student_studentSeller_authValidation,  inStock);

export default productRouter;
