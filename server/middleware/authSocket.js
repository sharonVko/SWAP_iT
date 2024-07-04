import jwt from 'jsonwebtoken';
import User from '../models/usersSchema.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const authMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.query.token;

    if (!token) {
      throw new ErrorResponse('Authentication error: No token provided', 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(
          new ErrorResponse('Authentication error: Invalid token', 401)
        );
      }

      const user = await User.findById(decoded.uid);
      if (!user) {
        return next(
          new ErrorResponse('Authentication error: User not found', 401)
        );
      }

      socket.user = user;
      next();
    });
  } catch (error) {
    next(new ErrorResponse('Authentication error', 401));
  }
};

export default authMiddleware;
