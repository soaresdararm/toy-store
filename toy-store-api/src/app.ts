import express from "express";
import cors from "cors";
import { setupSwagger } from "./utils/swagger";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import salesRoutes from "./routes/salesRoutes";

const app = express();
app.use(cors());

setupSwagger(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Toy Store está online!" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
