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

import { adminAuthValidation } from "../../Middlewares/AdminAuthMiddleware/admin.auth.middleware";
import { userAuthValidation } from "../../Middlewares/UserAuthMiddleware/user.auth.middleware";

productRouter.get("/all", adminAuthValidation, getAllProducts);
productRouter.post("/add", addProduct);
productRouter.delete("/del/:product_id", adminAuthValidation, removeProduct);
productRouter.get("/cat/:category", getProductsByCategory);
productRouter.get("/con/:condition", getProductsByCondition);
productRouter.get("/approved", approvedProducts);
productRouter.get(
  "/products/notapproved",
  adminAuthValidation,
  notApprovedProducts
);
productRouter.put("/approve/:product_id", adminAuthValidation, approveProduct);
productRouter.get("/:product_id", getProductById);
productRouter.get("/university/:university_id", getProductsByUniversity);
productRouter.get("/user/:user_id", adminAuthValidation, getProductsByUser);
productRouter.get("/available/:university_id", getAvailableProducts);
productRouter.put("/oos/:product_id", userAuthValidation, outOfStock);
productRouter.put("/is/:product_id", userAuthValidation, inStock);

export default productRouter;
