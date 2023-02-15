import { NextFunction, Request, Response } from "express";

export default (func: any) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);
