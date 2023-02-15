import supertest from "supertest";
import { app } from "../src/app";

const request = supertest(app);

export default request;
