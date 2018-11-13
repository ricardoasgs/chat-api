const app = require("./config/express");
const authRouter = require("./app/routers/authRouter");
const chatRouter = require("./app/routers/chatRouter");
const userRouter = require("./app/routers/userRouter");
const upload = require("./modules/upload");

app.use("/healthCheck", (req, res) => {
  res.send("Ok");
});

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err, "error");
    } else {
      console.log("file: ", req.file);
    }
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
