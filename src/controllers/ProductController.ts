import { Response, Request, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import ProductService from "../services/Product";

import CreateValidator from "../validators/products/Create";
import UpdateValidator from "../validators/products/Update";
import IdValidator from "../validators/Id";
import PaginationValidator from "../validators/Pagination";

/**
 * @route   GET v1/products
 * @desc    Get all products
 */
export const index = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await PaginationValidator(req.query);

    const products = await ProductService.getAll(validatedData);

    return res.status(200).json({
      message: "",
      data: products,
    });
  }
);

/**
 * @route   POST v1/products
 * @desc    Create products
 */
export const store = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await CreateValidator(req.body);

    const product = await ProductService.create(validatedData, req.files);

    return res.status(201).json({
      message: "",
      data: product,
    });
  }
);

/**
 * @route   DELETE v1/products/:id
 * @desc    Delete a products
 */
export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedId = await IdValidator(req.params);
    await ProductService.deleteProduct(validatedId.id);

    return res.status(200).json({
      message: "Product deleted successfully",
      data: {},
    });
  }
);

/**
 * @route   PATCH v1/products/:id
 * @desc    Update products
 */
export const update = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const [validatedData, validatedId] = await Promise.all([
      UpdateValidator(req.body),
      IdValidator(req.params),
    ]);

    const product = await ProductService.update(
      validatedId.id,
      validatedData,
      req.files
    );

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  }
);

/**
 * @route   GET v1/products/:id
 * @desc    Get single product
 */
export const getSingleProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedId = await IdValidator(req.params);

    const product = await ProductService.findOne(validatedId.id);

    return res.status(200).json({
      message: "",
      data: product,
    });
  }
);
