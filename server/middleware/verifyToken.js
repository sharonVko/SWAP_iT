import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  // Get token from headers or cookies
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) throw new ErrorResponse("Please login", 401);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (error) {
    // Handle errors from jwt.verify
    throw new ErrorResponse("Invalid token, please login again", 401);
  }
});

export default verifyToken;
