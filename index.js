const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { postRouter } = require("./routes/posts.route");
const { userRouter } = require("./routes/users.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config();
const app = express();
app.use(express.json(), cors());
app.use("/users", userRouter);
app.use("/posts", authenticate, postRouter);
app.listen(process.env.PORT, async () => {
  console.log(`Server is running at port ${process.env.PORT}`);
  await connection;
  console.log("Connected to DB");
});
