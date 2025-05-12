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
} from "../../Controller/Products/product.controller";
import { adminAuthValidation } from "../../Middlewares/AdminAuthMiddleware/admin.auth.middleware";
productRouter.get("/all",adminAuthValidation ,getAllProducts);

productRouter.post("/add", addProduct);
productRouter.delete("/del/:product_id",adminAuthValidation, removeProduct);
productRouter.get("/cat/:category", getProductsByCategory);
productRouter.get("/con/:condition", getProductsByCondition);
productRouter.get("/approved", approvedProducts);
productRouter.get(
  "/products/notapproved",
  adminAuthValidation,
  notApprovedProducts
);
productRouter.put(
  "/approve/:product_id",
  adminAuthValidation,
  approveProduct
);

export default productRouter;
