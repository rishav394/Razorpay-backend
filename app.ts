import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import captureRoutes from "./routes/capture-routes";
import orderRoutes from "./routes/order-routes";

const app = express();

// Had to use this as my react project and this heroku servers are running on different domain
app.use(cors());
app.use(bodyParser.json());

// The order generation route
app.use("/order", orderRoutes);
// The order verification and capturing routes
app.use("/capture", captureRoutes);

export default app;
