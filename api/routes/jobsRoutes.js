import express from "express";
import {userAuth,adminAuth} from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
  getSavedJobs
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/upload-job", userAuth ,adminAuth, createJob);
router.put("/update-job/:jobId", userAuth ,adminAuth, updateJob);
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);
router.delete("/delete-job/:id", userAuth ,adminAuth, deleteJobPost);

export default router;
