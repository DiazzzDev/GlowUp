import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRouter from "./src/routers/product.js";
import employeeRouter from "./src/routers/employee.js";
import ordersRouter from "./src/routers/orders.js"
import customerRouter from "./src/routers/customer.js";
import customerAuthRouter from "./src/routers/customerAuth.js"
import employeeLoginRouter from "./src/routers/employeeLogin.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/employees", employeeRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/customer", customerRouter)
app.use("/api/auth/customer", customerAuthRouter)
app.use("/api/employee/login", employeeLoginRouter)

export default app; 