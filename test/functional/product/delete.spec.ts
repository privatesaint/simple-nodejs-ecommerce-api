import Product from "../../../src/models/Product";
import request from "../../Request";
import { expect } from "chai";
import dbconnection from "../../../src/config/connection";
import Sinon from "sinon";
import * as FileSystem from "../../../src/services/FileSystem";

describe("Delete Product", function () {
  let connection, deleteFileSpy, product;

  before(async () => {
    connection = await dbconnection();
    deleteFileSpy = Sinon.spy();

    // replace the deleteFile function in the service with the spy
    Sinon.replace(FileSystem, "deleteFile", deleteFileSpy);

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

  it("should be able to delete product successfully", async function () {
    const response = await request.delete(`/v1/products/${product.id}`);

    Sinon.assert.calledOnce(deleteFileSpy);
    expect(response.status).to.equal(200);
  });

  it("should return not found for product that does not exist", async function () {
    const response = await request.get(`/v1/products/637fd02fc1cf154992ac0dab`);

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal("Product not found");
  });
});
