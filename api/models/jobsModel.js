import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { String },
    companyLogo: { type: String },
    jobType: { type: String},
    jobTitle: {type:String},
    location: { type: String },
    batch: {type: String},
    salary: { type: Number },
    experience: { type: Number, default: 0 },
    detail: { type: String },
    stipend: { type: String },
    skill_req: {type:String},
    apply_url: {type:String}
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
