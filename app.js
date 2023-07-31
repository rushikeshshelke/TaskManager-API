require("dotenv").config();
const express = require("express");

const tasks = require("./routes/Task");
const HttpError = require("./utils/http-error");
const establishConnection = require("./utils/connect");

app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    success: false,
    message: error.message || "An unknown error occurred!",
  });
});

const port = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await establishConnection(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`TaskManager server is up and running on ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startApp();
