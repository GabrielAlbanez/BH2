import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session['token'];

  if (!token) {
    return res.status(404).json({ message: "Você precisa estar logado" });
  }

  try {
    const decodedToken = jwt.verify(token, "8080");
    next();
  } catch (err) {
    return res.status(500).json({ message: "Token expirado ou inválido", recomendation:  "fazer login novamente" });
  }
};