import jwt from 'jsonwebtoken';
import User from '../models/usersSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const authMiddleware = asyncHandler(async (req, res, socket, next) =>
{
  const token = socket.handshake.query.token;

  if (!token) throw new ErrorResponse('Authentication error', 401);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  socket.uid = decoded.uid;
  next();
});

export default authMiddleware
