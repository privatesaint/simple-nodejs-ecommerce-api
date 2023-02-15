import { Router } from "express";
import * as ProductController from "../../controllers/ProductController";

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Returns list of all products
 *     description: Get paginated product data
 *     tags: [PRODUCT]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *
 *     parameters:
 *
 *       - name: page
 *         in: query
 *         description: current page is required
 *         example: 1
 *         required: true
 *
 *
 *       - name: limit
 *         in: query
 *         example: 10
 *         required: true
 *
 *
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: {"docs":[{"_id":"63ebb940c3021e16590c8759","name":"Product One","category": "electronics","description":"first product created","quantity":10,"price":100,"imageUrl": "https://res.cloudinary.com/sample/image/upload/product/file_y4vhmm.jpg","createdAt":"2023-02-14T16:39:28.517Z","updatedAt":"2023-02-14T16:39:28.517Z"}],"totalDocs":1,"limit":10,"totalPages":1,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":false,"prevPage":null,"nextPage":null}
 *              message: ""
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 */
router.get("/", ProductController.index);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create product
 *     description: api to create product
 *     tags: [PRODUCT]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *
 *     requestBody:
 *
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: [string]
 *                  required: true
 *               category:
 *                  type: [string]
 *                  required: true
 *               description:
 *                  type: [string]
 *                  required: true
 *               quantity:
 *                  type: [number]
 *                  minimum: 1
 *                  required: true
 *               price:
 *                  type: [number]
 *                  minimum: 1
 *                  required: true
 *               productImage:
 *                 type: string
 *                 description: select image
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: {"_id":"63ebb940c3021e16590c8759","name":"Product One","category": "electronics","description":"first product created","quantity":10,"price":100,"imageUrl": "https://res.cloudinary.com/sample/image/upload/product/file_y4vhmm.jpg","createdAt":"2023-02-14T16:39:28.517Z","updatedAt":"2023-02-14T16:39:28.517Z"}
 *              message: ""
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 */
router.post("/", ProductController.store);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get single product
 *     description: api to get single product
 *     tags: [PRODUCT]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     parameters:
 *
 *       - name: id
 *         in: path
 *         description: product id
 *         required: true
 *
 *
 *
 *
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: {"_id":"63ebb940c3021e16590c8759","name":"Product One","category": "electronics","description":"first product created","quantity":10,"price":100,"imageUrl": "https://res.cloudinary.com/sample/image/upload/product/file_y4vhmm.jpg","createdAt":"2023-02-14T16:39:28.517Z","updatedAt":"2023-02-14T16:39:28.517Z"}
 *              message: ""
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 */
router.get("/:id", ProductController.getSingleProduct);

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     summary: Update product
 *     description: api to update product
 *     tags: [PRODUCT]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     parameters:
 *
 *       - name: id
 *         in: path
 *         description: product id
 *         required: true
 *
 *     requestBody:
 *
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: [string]
 *                  required: false
 *               category:
 *                  type: [string]
 *               description:
 *                  type: [string]
 *               quantity:
 *                  type: [number]
 *                  minimum: 1
 *               price:
 *                  type: [number]
 *                  minimum: 1
 *               productImage:
 *                 type: string
 *                 description: select image
 *                 format: binary
 *
 *
 *
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: {"_id":"63ebb940c3021e16590c8759","name":"Product One","category": "electronics","description":"first product created","quantity":10,"price":100,"imageUrl": "https://res.cloudinary.com/sample/image/upload/product/file_y4vhmm.jpg","createdAt":"2023-02-14T16:39:28.517Z","updatedAt":"2023-02-14T16:39:28.517Z"}
 *              message: ""
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 */
router.patch("/:id", ProductController.update);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     description: api to delete a product
 *     tags: [PRODUCT]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     parameters:
 *
 *       - name: id
 *         in: path
 *         description: product id
 *         required: true
 *
 *
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: {}
 *              message: ""
 *
 */
router.delete("/:id", ProductController.deleteProduct);

export default router;
