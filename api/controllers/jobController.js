import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Users from "../models/userModel.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      company,
      companyLogo,
      jobType,
      jobTitle,
      location,
      batch,
      salary,
      experience,
      detail,
      stipend,
      skill_req,
      apply_url
    } = req.body;


    const jobPost = {
      company,
      companyLogo,
      jobTitle,
      jobType,
      location,
      batch,
      salary,
      experience,
      detail,
      stipend,
      skill_req,
      apply_url
    };

    const job = new Jobs(jobPost);
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job Posted SUccessfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check if jobId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(404).send
      (`Invalid Job ID: ${jobId}`);
    }

    const existingJob = await Jobs.findById(jobId);

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedFields = {};
    for (const key in req.body) {
      if (req.body[key] !== undefined) {
        updatedFields[key] = req.body[key];
      }
    }

    // Update the job with the new values
    const updatedJob = await Jobs.findByIdAndUpdate(
      jobId,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getJobPosts = async (req, res, next) => {
  try {
    const { search, location, jtype } = req.query;
    const types = jtype?.split(","); 

    let queryObject = {};

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    if (jtype) {
      queryObject.jobType = { $in: types };
    }


    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    let queryResult = Jobs.find(queryObject);

   
    queryResult = queryResult.sort("-createdAt");

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    //records count
    const totalJobs = await Jobs.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);

    queryResult = queryResult.limit(limit * page);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById({ _id: id });

    if (!job) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    //GET SIMILAR JOB POST
    const searchQuery = {
      $or: [
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = Jobs.find(searchQuery).sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Jobs.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      messsage: "Job Post Delted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const getSavedJobs = async (req, res, next) => {
  try {
    const userId = req.body.user.userId; // Assuming the user ID is available in the request body

    // Fetch the user document from the database
    const user = await Users.findById(userId).populate("savedJobs");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedJobs = user.savedJobs; 

    res.status(200).json({ success: true, savedJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

