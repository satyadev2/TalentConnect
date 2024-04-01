import mongoose from "mongoose";
import Users from "../models/userModel.js";

export const updateUser = async (req, res, next) => {
  const {
    name,
    email,
    contact,
    location,
    image,
    batch,
    skills,
    savedJobs,
    college
  } = req.body;

  try {
    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    // Fetch the existing user
    let user = await Users.findById(id);

    if (!user) {
      return res.status(404).send(`No User found with id: ${id}`);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (location) user.location = location;
    if (image) user.image = image;
    if (batch) user.batch = batch;
    if (skills) user.skills = skills;
    if (savedJobs) user.savedJobs = savedJobs;
    if (college) user.college = college;

    
    user = await user.save();

    const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
