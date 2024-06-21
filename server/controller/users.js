import User from '../models/usersSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register
export const register = asyncHandler(async (req, res, next) =>
{
  const { firstname, lastname, username, email, password, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ErrorResponse('An account with this Email already exists', 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hash,
    address
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// LOGIN
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

// Verify User
export const getUser = asyncHandler(async (req, res, next) =>
{
  const user = await User.findById(req.uid);
  res.json(user);
});

// Logout....
export const logout = asyncHandler(async (req, res, next) =>
{
  res.clearCookie('token');
  res.send({ status: 'success' });
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