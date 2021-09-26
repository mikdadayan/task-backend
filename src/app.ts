import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";

import CustomError from "./utils/customError";
import apiRouter from "./routes/apiRouter";
import publicRouter from "./routes/publicRouter";
import mockUser from "./middlewares/mockUser";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const options: cors.CorsOptions = {
  origin: "*",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};

const app = express();

app.use(cors(options));

app.use(express.json());

app.use(
  session({
    secret: "test_secret",
    saveUninitialized: true,
    resave: true,
  })
);

// Comment out to disable mocked user session
app.use(mockUser);

app.use("/pub/proxy", publicRouter);
app.use("/api/proxy", apiRouter);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({ success: false, error: error.message });
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, msg: "404, Page Not Found." });
});

app.listen(3000, () => {
  console.log("Server Started.");
});
