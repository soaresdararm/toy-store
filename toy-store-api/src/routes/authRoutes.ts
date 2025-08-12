import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", (req, res) => {
  res.json({ message: "Auth route funcionando!" });
});

export default router;
