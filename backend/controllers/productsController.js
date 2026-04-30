import { Products } from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price,image } = req.body;
    const newProduct = await Products.create({
      name,
      description,
      price,
      image
    });
    return res.status(201).json({ succes: true, data: newProduct });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    await product.update(req.body);

    return res.status(200).json({
      message: "update succeed",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    await product.destroy();
    return res.status(200).json({ message: "product is deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
