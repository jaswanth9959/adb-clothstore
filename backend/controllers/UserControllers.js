import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    dob,
    phone,
    address,
    city,
    pin,
    state,
    country,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    dob,
    phone,
    address,
    city,
    pin,
    state,
    country,
  });

  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    res.json({
      user,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      phone: user.phone,
      dob: user.dob,
      address: user.address,
      city: user.city,
      pin: user.pin,
      state: user.state,
      country: user.country,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.dob = req.body.dob || user.dob;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.pin = req.body.pin || user.pin;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      user: updatedUser,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.status(200).json(user);
});

export {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserById,
  getUsers,
};
