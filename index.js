require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/dbConn");

const app = express();

// database connection
connectToDB();

// routers for routing APIs

const registerRouter = require("./routes/registerRoutes");
const loginRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// Configuration Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API Routes

app.use("/User", registerRouter);
app.use("/Login", loginRouter);
app.use("/Reset", userRouter);
app.use("/Update", userRouter);

// app.use("/api", authRouter);
// app.use("/api", userRouter);

const PORT = process.env.SERVER_PORT && 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
