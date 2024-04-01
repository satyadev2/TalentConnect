import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";

export const userAuth = async (req, res, next) => {
  
  const token = req.cookies.token;
  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export const adminAuth = async (req, res, next) => {
  const id = req.body.user.userId;
  let user = await Users.findById(id);
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden. Only admin users are allowed to perform this action." });
  }

  next();
};

export default {userAuth,adminAuth};
