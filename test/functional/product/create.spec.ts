import Product from "../../../src/models/Product";
import request from "../../Request";
import { expect, assert } from "chai";
import dbconnection from "../../../src/config/connection";
import Sinon from "sinon";
import * as FileSystem from "../../../src/services/FileSystem";

describe("Create Product", function () {
  let connection, uploadFileSpy, testFile, fileName;

  before(async () => {
    connection = await dbconnection();
    uploadFileSpy = Sinon.spy();

    // replace the uploadFile function in the service with the spy
    Sinon.replace(FileSystem, "uploadFile", uploadFileSpy);
    testFile = Buffer.from("test data", "utf-8");
    fileName = "testfile.png";
  });

  after(async () => {
    Sinon.restore();

    await Product.deleteMany({});

    await connection.disconnect();
  });

  // this.timeout(0);
  it("should be able to add product with valid data", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "product one description")
      .field("quantity", 10)
      .field("price", 200)
      .attach("productImage", testFile, fileName);

    Sinon.assert.calledOnce(uploadFileSpy);
    assert.equal(
      Buffer.compare(uploadFileSpy.firstCall.args[0].data, testFile),
      0
    );
    expect(response.status).to.equal(201);
    expect(response.body.data.name).to.equal("Product One test");
    expect(response.body.data.description).to.equal("product one description");
    expect(response.body.data.quantity).to.equal(10);
    expect(response.body.data.price).to.equal(200);
  });

  it("should return validation error for empty product name", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "")
      .field("category", "fashion")
      .field("description", "product one description")
      .field("quantity", 10)
      .field("price", 200)
      .attach("productImage", testFile, fileName);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Product name is required");
  });

  it("should return validation error for empty product category", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "")
      .field("description", "product one description")
      .field("quantity", 10)
      .field("price", 200)
      .attach("productImage", testFile, fileName);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Product category is required");
  });

  it("should return validation error for empty product description", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "")
      .field("quantity", 10)
      .field("price", 200)
      .attach("productImage", testFile, fileName);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Product description is required");
  });

  it("should return validation error for product quantity less than 1", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "product one description")
      .field("quantity", 0)
      .field("price", 200)
      .attach("productImage", testFile, fileName);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Product quantity can not be less than 1"
    );
  });

  it("should return validation error for product price less than 1", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "product one description")
      .field("quantity", 10)
      .field("price", 0)
      .attach("productImage", testFile, fileName);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Product price can not be less than 1"
    );
  });

  it("should return validation error for empty product image", async function () {
    const response = await request
      .post("/v1/products")
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "product one description")
      .field("quantity", 10)
      .field("price", 200);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Product image is required");
  });
});
