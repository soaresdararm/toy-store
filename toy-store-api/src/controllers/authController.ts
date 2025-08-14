import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/user";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Usuário já cadastrado." });
  }

  await createUser({ email, password });
  return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "E-mail ou senha inválidos." });
  }

  const token = jwt.sign({ email }, "your_jwt_secret", { expiresIn: "1h" });
  return res.status(200).json({ token });
};
