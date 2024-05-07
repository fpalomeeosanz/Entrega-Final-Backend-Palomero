import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { ProductsController } from "../controllers/product.controllers.js";

const router = Router();

//GET ALL
router.get("/products", async (req, res) => {
    await ProductsController.getAllProducts(req, res);
});
  
//GET BY ID
router.get("/products/:id", async (req, res) => {
    await ProductsController.getProductById(req, res);
});
  
//CREATE PREMIUN
router.post("/products", checkRole(["admin", "premium"]), async (req, res) => {
    await ProductsController.createProduct(req, res);
});
  
//UPDATE PREMIUN
router.put("/products/:id", checkRole(["admin", "premium"]), async (req, res) => {
    await ProductsController.updateProduct(req, res);
});
  
//DELETE
router.delete("/products/:id", checkRole(["admin", "premium"]), async (req, res) => {
    await ProductsController.deleteProduct(req, res);
});

export { router as productsRouter }