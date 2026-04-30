import Users from "./Users.js";
import { Products } from "./Products.js";
import { Cart } from "./Cart.js";

// USER - CART (One to Many)
Users.hasMany(Cart, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Cart.belongsTo(Users, {
  foreignKey: "userId",
});

// PRODUCT - CART (One to Many)
Products.hasMany(Cart, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

Cart.belongsTo(Products, {
  foreignKey: "productId",
});