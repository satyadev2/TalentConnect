import Users from "../models/userModel.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name,email,password);


  if (!name) {
    next("name is required");
  }

  if (!email) {
    next("Email is required");
  }
  
  if (!password) {
    next("Password is required");
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const user = await Users.create({
      name,
      email,
      password,
    });

    
    const token = await user.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide AUser Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid -email or password");
      return;
    }

    // compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = undefined;

    const token = user.createJWT();

    res.cookie('token', token, { httpOnly: true }).status(201).json({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
    if (user) {
      const token = user.createJWT();
      user.password = undefined;
        res.cookie('token', token, { httpOnly: true }).status(201).json({
          success: true,
          message: "Login successfully",
          user,
        });

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new Users({ name: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, image: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      user.password = undefined;
      res.cookie('token', token, { httpOnly: true }).status(201).json({
        success: true,
        message: "Login successfully",
        user,
      });

    }
  } catch (error) {
    next(error)
  }
}


export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};