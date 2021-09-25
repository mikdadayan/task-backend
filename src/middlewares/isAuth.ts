import { RequestHandler } from "express";
import CustomError from "../utils/customError";

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.session.user !== undefined) {
    console.log("User is not authenticated!");
    next(new CustomError("Not Authorized.", 401));
  } else {
    console.log("authorised access!");
    next();
  }
};

export const checkMiddlware: RequestHandler = (req, res, next) => {
  if (
    req.originalUrl.indexOf("/api/proxy") === 0 ||
    req.originalUrl.indexOf("/pub/proxy") === 0
  ) {
    console.log("hitted");
    if (req.session.user !== undefined) {
      console.log("User is not authenticated!");
      next(new CustomError("Not Authorized.", 401));
    } else {
      console.log("authorised access!");
      next();
    }
  } else {
    const error = new CustomError("Not found(()).", 404);
    next(error);
  }
};
