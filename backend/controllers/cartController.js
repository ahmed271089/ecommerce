import { Cart } from "../models/Cart.js";
import { Products } from "../models/Products.js";



export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    const cart = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "price", "image", "description"]
        }
      ]
    });

    let total = 0;

    cart.forEach(item => {
      if (item.Products) {
        total += item.quantity * Number(item.Products.price);
      }
    });

    res.json({ cart, total });

  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const item = await Cart.findOne({ where: { userId, productId } });

    if (item) {
      item.quantity += 1;
      await item.save();
      return res.json(item);
    }
    const newItem = await Cart.create({
      userId,
      productId,
      quantity: 1
    });

    res.json(newItem);

  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const deleted = await Cart.destroy({
      where: { userId, productId }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed" });

  } catch (err) {
    console.error("REMOVE CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const item = await Cart.findOne({
      where: { userId, productId }
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (quantity <= 0) {
      await item.destroy();
      return res.json({ message: "Item removed" });
    }

    item.quantity = quantity;
    await item.save();

    res.json(item);

  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};