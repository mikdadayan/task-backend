import { Router } from "express";

import {
  checkRequest,
  bodyToJSONFile,
  ReadJSONFile,
} from "../controllers/controller";
import { isAuth, checkMiddlware } from "../middlewares/isAuth";

const router = Router();

router.get("/", checkRequest);

router.post("/save/:id", checkMiddlware, bodyToJSONFile);

router.get("/save/:id", checkMiddlware, ReadJSONFile);

export default router;
