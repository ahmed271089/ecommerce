import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/add", addProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
