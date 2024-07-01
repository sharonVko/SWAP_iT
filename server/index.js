import express from "express";
import "./db/dbConnect.js";
import usersRouter from "./routes/usersRouter.js";
import adsRouter from "./routes/adsRouter.js";
import mediaRouter from "./routes/mediaRouter.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/ErrorHandler.js";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies from cross-origin requests
  })
);
app.use(cookieParser()); // Add cookie-parser middleware

// ROUTES
app.use("/users", usersRouter);
app.use("/ads", adsRouter);
// app.use('/chats', chatsRouter);
// app.use('/swaps', swapsRouter);
// app.use('/notifications', notificationsRouter);
// app.use('/taxonomies', taxonomiesRouter);
app.use("/media", mediaRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
