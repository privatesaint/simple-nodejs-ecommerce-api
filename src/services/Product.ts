import Product from "../models/Product";
import { InterfaceCreateProduct } from "../types/products/create.dto";
import { InterfaceUpdateProduct } from "../types/products/update.dto";
import ErrorHandler from "../utils/ErrorHandler";
import { deleteFile, uploadFile } from "./FileSystem";

class ProductService {
  /**
   * Get all products
   * @returns
   */
  static async getAll(data) {
    const paginateOptions = {
      page: data.page,
      limit: data.limit,
      collation: {
        locale: "en",
      },
      sort: { createdAt: -1 },
    };

    return Product.paginate({}, paginateOptions);
  }

  /**
   * create new product
   * @returns
   */
  static async create(data: InterfaceCreateProduct, fileObj) {
    if (!fileObj || !fileObj.productImage) {
      throw new ErrorHandler("Product image is required", 400);
    }

    const uploadedFileName = await uploadFile(
      fileObj.productImage,
      "product",
      ""
    );

    return Product.create({
      name: data.name,
      category: data.category,
      fileName: uploadedFileName,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
    });
  }

  /**
   * Update product
   * @param id
   * @param value
   * @returns
   */
  static async update(id: string, data: InterfaceUpdateProduct, fileObj) {
    const product = await this.findOne(id);

    if (fileObj && fileObj.productImage) {
      const fileName = product.fileName.split(".")[0];

      await uploadFile(fileObj.productImage, "", `product/${fileName}`);
    }

    product.name = data.name || product.name;
    product.category = data.category || product.category;
    product.description = data.description || product.description;
    product.quantity = data.quantity || product.quantity;
    product.price = data.price || product.price;

    return product.save();
  }

  /**
   * Get single product
   * @param id
   */
  static async findOne(id: string) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }
    return product;
  }

  /**
   * Delete product
   * @param id
   */
  static async deleteProduct(id: string) {
    const product = await this.findOne(id);

    const fileName = product.fileName.split(".")[0];

    await deleteFile(`product/${fileName}`);

    return Product.deleteOne({ _id: id });
  }
}

export default ProductService;
