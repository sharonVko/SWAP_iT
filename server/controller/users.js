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

// login
export const login = asyncHandler(async (req, res, next) =>
{
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select('+password');
  if (!existingUser) throw new ErrorResponse('Email does not exist', 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });
  // res.json({ token });
  res.cookie('token', token, { maxAge: 1800000 }); // 30mn
  res.send({ status: 'success' });
});
