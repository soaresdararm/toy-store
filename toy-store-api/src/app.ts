import express from "express";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import salesRoutes from "./routes/salesRoutes";
import { connectDB } from "./utils/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Toy Store está online!" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
