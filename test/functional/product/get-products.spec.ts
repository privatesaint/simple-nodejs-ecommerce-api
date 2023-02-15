import Product from "../../../src/models/Product";
import request from "../../Request";
import { expect } from "chai";
import dbconnection from "../../../src/config/connection";
import Sinon from "sinon";

describe("Get All/Single Product", function () {
  let connection, product;

  before(async () => {
    connection = await dbconnection();

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

  it("should be able to get all products", async function () {
    const response = await request.get(`/v1/products?page=1&limit=10`);

    expect(response.status).to.equal(200);
    expect(response.body.data.docs[0].name).to.equal(product.name);
    expect(response.body.data.totalDocs).to.equal(1);
    expect(response.body.data.docs[0].price).to.equal(product.price);
  });

  it("should be able to get single product with valid product id", async function () {
    const response = await request.get(`/v1/products/${product.id}`);

    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal(product.name);
    expect(response.body.data.price).to.equal(product.price);
  });

  it("should return error for invalid product id", async function () {
    const response = await request.get(`/v1/products/mnsnkdjsbfjkdbsfkjs`);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("Invalid Id value");
  });

  it("should return not found for product that does not exist", async function () {
    const response = await request.get(`/v1/products/637fd02fc1cf154992ac0dab`);

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal("Product not found");
  });
});
