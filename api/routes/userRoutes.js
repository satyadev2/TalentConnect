import express from "express";
import {userAuth,adminAuth} from "../middlewares/authMiddleware.js";
import { getUser, updateUser } from "../controllers/userController.js";
import { getSavedJobs
  } from "../controllers/jobController.js";

const router = express.Router();

router.post("/get-user", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);
router.get("/get-saved-jobs", userAuth, getSavedJobs)
export default router;
