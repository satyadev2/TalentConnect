import express from "express";
import { rateLimit } from "express-rate-limit";
import { register, signIn,google,signOut } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", signIn);
router.post('/google', google)
router.get('/signout', signOut)

export default router;
