import User from "../models/usersSchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Ads from "../models/adsSchema.js";

// Register according to frontend address zip field
export const register = asyncHandler(async (req, res, next) =>
{
  const { firstname, lastname, username, email, password, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hash,
    address: {
      street: address.street,
      housenumber: address.housenumber,
      zip: address.zip,
      city: address.city,
      country: address.country,
    },
  });

  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// LOGIN
export const login = asyncHandler(async (req, res, next) =>
{
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser)
    throw new ErrorResponse("Email does not exist , please register", 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse("Password is incorrect", 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  // res.json({ token });
  res.cookie("token", token, {
		httpOnly: true,
		maxAge: 120 * 60 * 1000,
		sameSite: 'None',
		secure: true,
		domain: 'swapit-preview.netlify.app'
	});

  res.send({ status: "success" });
});

// Verify User
export const getUser = asyncHandler(async (req, res, next) =>
{
  const user = await User.findById(req.uid);
  res.json(user);
});

// Logout....
export const logout = asyncHandler(async (req, res, next) =>
{
  res.clearCookie("token");
  res.send({ status: "success" });
});

//getAllUsers
export const getAllUsers = asyncHandler(async (req, res, next) =>
{
  const users = await User.find();
  res.json(users);
});

//get user by id
export const getSingleUser = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse(`User ${id} does not exist`, 404);
  res.send(user);
});

// update user
export const updateUser = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid
  } = req;

  console.log("Update request body:", body);
  console.log("User ID ---:", id);
  console.log("User token ID ---:", uid);

  if (req.file !== undefined)
  {
    body.profileimage = req.file.path;
  }

  const found = await User.findById(id);
  if (!found) throw new ErrorResponse(`User ${id} does not exist`, 404);
  if (uid !== found.id.toString())
    throw new ErrorResponse(
      "You have no permission to update this Details",
      401
    );

  const updatedUser = await User.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.json(updatedUser);
});



//update password not for forgate pass
export const changePassword = asyncHandler(async (req, res, next) =>
{
  const userId = req.uid;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userId).select("+password");
  if (!user) throw new ErrorResponse("User not found", 404);

  // Check if the old password provided matches the user's current password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ErrorResponse("Old password is incorrect", 401);

  // Check if the new password and confirm password match
  if (newPassword !== confirmPassword)
    throw new ErrorResponse("Passwords do not match", 400);

  // Update the user's password with the new hashed password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.send({ status: "Password updated successfully" });


});


//get all ads by user
export const getAllAdsByUser = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse(`User ${id} does not exist`, 404);
  const ads = await Ads.find({ user_id: id });
  res.json(ads);
});

// Toggle favorite
export const toggleFavorite = asyncHandler(async (req, res, next) =>
{
  const { userId, adId } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse(`User ${userId} does not exist`, 404);

  const index = user.favorites.indexOf(adId);
  if (index > -1)
  {
    user.favorites.splice(index, 1); // Remove adId from favorites
  } else
  {
    user.favorites.push(adId); // Add adId to favorites
  }

  await user.save();
  res.send(user);
});
