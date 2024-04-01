import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import jobRoute from "./jobsRoutes.js";
// const cors = require('cors');
import cors from "cors"


const router = express.Router();

router.use(cors());

router.use('/api/auth', authRoute); 
router.use('/api/users', userRoute);
router.use('/api/jobs', jobRoute);

export default router;
