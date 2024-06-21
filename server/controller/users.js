import User from '../models/usersSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//register

export const register = asyncHandler(async (req, res, next) =>
{
  const { firstName, lastName, username, email, password, phone, profileimage, address, preferredcats, preferredtags, favorites } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exist', 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
    phone,
    profileimage,
    address,
    preferredcats,
    preferredtags,
    favorites,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});