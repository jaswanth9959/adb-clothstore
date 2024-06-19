import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/User.js";
import productRoutes from "./routes/Products.js";
// import customerRoutes from "./routes/customers.js";
import orderRoutes from "./routes/Order.js";
import categoryRoutes from "./routes/category.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/staff", staffRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
