import jwt from 'jsonwebtoken';
import User from '../models/usersSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const authMiddleware = asyncHandler(async (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    next(new ErrorResponse('Authentication error', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.uid = decoded.uid;
    next();
  } catch (err) {
    next(new ErrorResponse('Authentication error', 401));
  }
});

export default authMiddleware;
