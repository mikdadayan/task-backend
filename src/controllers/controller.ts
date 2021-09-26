import { RequestHandler } from "express";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import fs from "fs";

export const checkRequest: RequestHandler = (req, res, next) => {
  return sendSuccessResponse(res, "You entered right path.", 200, {});
};

export const bodyToJSONFile: RequestHandler = (req, res, next) => {
  const newFileDist = `${__dirname}/data/${req.params.id}.json`;

  if (!fs.existsSync(`${__dirname}/data`)) {
    fs.mkdirSync(`${__dirname}/data`);
  }

  fs.writeFile(newFileDist, JSON.stringify(req.body), (err) => {
    if (err) throw err;
    if (fs.existsSync(newFileDist)) {
      //file exists
      console.log("Your file has been updated!");
      return sendSuccessResponse(res, "Your file has been updated!", 201, {});
    }
    console.log("Your file has been saved!");
    return sendSuccessResponse(res, "Your file has been saved!", 201, {});
  });
};

export const ReadJSONFile: RequestHandler = (req, res, next) => {
  if (!fs.existsSync(`${__dirname}/data/${req.params.id}.json`)) {
    //file exists
    console.log("File does not exists.");
    return sendErrorResponse(req, res, 404, "File does not exists.", {});
  }
  let data = fs.readFileSync(
    `${__dirname}/data/${req.params.id}.json`,
    "utf-8"
  );
  return sendSuccessResponse(res, "Success.", 200, JSON.parse(data));
};
