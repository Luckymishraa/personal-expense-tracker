import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expensesRoute from "./routes/expenses.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/expenses", expensesRoute);

// Use Atlas URI when running on Render, else use env/local
const ATLAS_URI =
  "mongodb+srv://luckymishra233:Lucky12345@cluster0.91cw6os.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0";

const MONGO_URI =
  process.env.RENDER === "true"
    ? ATLAS_URI
    : process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";

console.log("Using Mongo URI:", MONGO_URI);

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
