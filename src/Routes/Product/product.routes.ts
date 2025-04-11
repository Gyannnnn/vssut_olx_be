import { Router } from "express";
const productRouter  = Router();


import { getAllProducts } from "../../Controller/Products/product.controller";
import { addProduct } from "../../Controller/Products/product.controller";

productRouter.get("/all",getAllProducts);
productRouter.post("/add",addProduct);



export default productRouter;