import { RequestHandler } from "express";
import { sendErrorResponse } from "../utils/response";

const authMiddleware: RequestHandler = (req, res, next) => {
  const isAuthenticated = req.session?.user;
  const urlMatch =
    req.originalUrl.indexOf("/api/proxy") === 0 ||
    req.originalUrl.indexOf("/pub/proxy") === 0;

  if (urlMatch) {
    if (!isAuthenticated) {
      return sendErrorResponse(req, res, 401, "Unauthorized.", {});
    } else {
      return next();
    }
  } else {
    return sendErrorResponse(req, res, 404, "URL does not match.", {});
  }
};

export default authMiddleware;
