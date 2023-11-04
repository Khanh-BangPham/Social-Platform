import chalk from "chalk";
import moment from "moment";
import fs from "fs";
import { HttpResponse } from "../utils/HttpResponse";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("errorMiddleware");
  let log = `\n${req.method}: ${req.url} - ${moment().format(
    "DD/MM/YYYY"
  )}: ${JSON.stringify(req.body)} - ${err}`;
  console.log(chalk.red(log));

  fs.appendFile(`./errors/${moment().format("DD-MM-YYYY")}.txt`, log, () => {});
  if(err.name.includes("TokenExpiredError")){
    res.status(401).json(HttpResponse.tokenExpiredError(err))
    return
  }
  res.status(400).json(HttpResponse.error(err));
};
