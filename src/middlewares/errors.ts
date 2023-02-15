import { Response, Request, NextFunction } from "express";

export default (err, req: Request, res: Response, next: NextFunction) => {
  const error = { ...err };
  error.statusCode = err.statusCode || 500;

  // handle validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // handle invalid mongo id
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid Id value",
    });
  }

  error.message = err.message || "Internal Server Error.";

  return res.status(error.statusCode).json({
    message: error.message,
  });
};
