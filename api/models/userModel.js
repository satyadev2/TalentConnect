import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";



const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    contact: { type: String },
    image: { type: String,
             default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    batch: { type: String },
    skills: { type: String },
    // savedJobs: { type: String },
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
    college: { type:String },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user' 
    }
  },
  { timestamps: true }
);

// middelwares
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model("Users", userSchema);

export default Users;
