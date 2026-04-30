import { urlencoded } from "express";
import sequelize from "../config/index.js";
import { DataTypes } from "sequelize";

export const Products = sequelize.define("Products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
