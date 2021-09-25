import { NextFunction, RequestHandler, Response, Request } from "express";
import fs from "fs";
export const checkRequest: RequestHandler = (req, res, next) => {
  res.status(200).json({ success: true });
};

export const bodyToJSONFile: RequestHandler = (req, res, next) => {
  console.log(req.body);
  console.log(__dirname);
  // if (!fs.existsSync(`${__dirname}/data`)) {
  //   fs.mkdirSync(`${__dirname}/data`);
  // }
  fs.writeFile(
    `${__dirname}/data/${req.params.id}.json`,
    JSON.stringify(req.body),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
      res.status(201).json("The file has been saved!");
    }
  );
};

export const ReadJSONFile: RequestHandler = (req, res, next) => {
  let data = fs.readFileSync(
    `${__dirname}/data/${req.params.id}.json`,
    "utf-8"
  );
  res.status(200).json({ data: JSON.parse(data) });
};
