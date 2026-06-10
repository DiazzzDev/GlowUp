import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import employeeRegisterRouter from "./src/routers/employeeRegister.js";
import productRouter from "./src/routers/product.js";
import employeeRouter from "./src/routers/employee.js";
import ordersRouter from "./src/routers/orders.js"

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/registerEmployee", employeeRegisterRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);

export default app;