import express from "express";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.put("/update", updateQuantity);
router.get("/all", getCart);

export default router;