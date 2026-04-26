import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }
  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET || "CHANGE_ME_TO_SECRET_IN_PROD";
    const payload = jwt.verify(token, secret);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}