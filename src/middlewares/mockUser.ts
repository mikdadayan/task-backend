import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  req.session.user = { id: "343", name: "John", email: "john@doe.com" };
  return next();
}
