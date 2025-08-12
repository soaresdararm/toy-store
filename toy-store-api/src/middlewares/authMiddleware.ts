import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secreta", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

export const authenticate = authMiddleware;