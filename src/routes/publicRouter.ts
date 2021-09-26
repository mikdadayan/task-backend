import { Router } from "express";

import {
  checkRequest,
  bodyToJSONFile,
  ReadJSONFile,
} from "../controllers/controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", checkRequest);

router.post("/save/:id", authMiddleware, bodyToJSONFile);

router.get("/save/:id", authMiddleware, ReadJSONFile);

export default router;
