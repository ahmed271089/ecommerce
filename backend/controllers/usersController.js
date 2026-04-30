import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ message: "user exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    return res.status(200).json({
        id:user.id,
        name:user.name,
        email:user.email,
        token:jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1d'})
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({
      where: { id: decoded.id },
      attributes: ["id", "name", "email"], // exclude password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};