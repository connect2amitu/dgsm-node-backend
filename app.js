const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const dotnet = require('dotenv').config()

const logger = require("morgan"); // Enable Console Logger
const cors = require("cors"); // Enable All CORS Requests
const compression = require("compression");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

const constant = require("./constants");
// const createError = require("http-errors");
const db = require("./database/mongoDbConnection"); //DB Connection

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Enable All CORS Requests
app.use(cors());

// Enable All requests lighter and load faster,
app.use(compression());

// A security middleware that handles several kinds of attacks in the HTTP/HTTPS protocols.
app.use(helmet());

//Image Upload
app.use(fileUpload({
  limits: {
    fileSize: 15 * 1024 * 1024
  }
}));

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(constant.NOT_FOUND).json({
    status: 0,
    message: "Invalid route"
  })
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
