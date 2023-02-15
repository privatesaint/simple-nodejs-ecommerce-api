import * as dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import helmet from "helmet";
import compression from "compression";
import expressFileupload from "express-fileupload";

dotenv.config();

// swagger api documentation packages
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOpts from "./swagger-options";

import routes from "./routes/v1";
import ErrorHandler from "./utils/ErrorHandler";
import errorMiddleware from "./middlewares/errors";

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

const httpServer = createServer(app);

app.use(helmet());

// config cors
app.use(cors());

app.disable("x-powered-by");

app.use(compression());

// express fileupload
app.use(expressFileupload());

app.use(express.json());

app.set("trust proxy", 1); // trust first proxy

const specs = swaggerJSDoc(swaggerOpts);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res, next) => {
  return res.redirect("/api-docs");
});

// routes
app.use("/v1", routes);

// error handlers
app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
);

// error handler
app.use(errorMiddleware);

export { app, httpServer };
