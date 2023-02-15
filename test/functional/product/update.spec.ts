import Product from "../../../src/models/Product";
import request from "../../Request";
import { expect, assert } from "chai";
import dbconnection from "../../../src/config/connection";
import Sinon from "sinon";
import * as FileSystem from "../../../src/services/FileSystem";

describe("Update Product", function () {
  let connection, uploadFileSpy, testFile, fileName, product;

  before(async () => {
    connection = await dbconnection();
    uploadFileSpy = Sinon.spy();

    // replace the uploadFile function in the service with the spy
    Sinon.replace(FileSystem, "uploadFile", uploadFileSpy);
    testFile = Buffer.from("test data", "utf-8");
    fileName = "testfile.png";

    product = await Product.create({
      name: "product one",
      category: "fashion",
      description: "product one test",
      quantity: 5,
      price: 100,
      fileName: "testfile.png",
    });
  });

  after(async () => {
    Sinon.restore();

    await Product.deleteMany({});

    await connection.disconnect();
  });

  // this.timeout(0);
  it("should be able to update product name successfully", async function () {
    const response = await request
      .patch(`/v1/products/${product.id}`)
      .field("name", "Product One test updated");

    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal("Product One test updated");
    expect(response.body.data.description).to.equal(product.description);
    expect(response.body.data.quantity).to.equal(product.quantity);
    expect(response.body.data.price).to.equal(product.price);
  });

  it("should be able to update product with valid data", async function () {
    const response = await request
      .patch(`/v1/products/${product.id}`)
      .field("name", "Product One test")
      .field("category", "fashion")
      .field("description", "product one description updated")
      .field("quantity", product.quantity + 20)
      .field("price", product.price + 50);

    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal("Product One test");
    expect(response.body.data.description).to.equal(
      "product one description updated"
    );
    expect(response.body.data.quantity).to.equal(product.quantity + 20);
    expect(response.body.data.price).to.equal(product.price + 50);
  });

  it("should be able to update product image", async function () {
    const response = await request
      .patch(`/v1/products/${product.id}`)
      .attach("productImage", testFile, fileName);

    Sinon.assert.calledOnce(uploadFileSpy);
    assert.equal(
      Buffer.compare(uploadFileSpy.firstCall.args[0].data, testFile),
      0
    );
    expect(response.status).to.equal(200);
    expect(response.body.data.fileName).to.equal(product.fileName);
  });
});
