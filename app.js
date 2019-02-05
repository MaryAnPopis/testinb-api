const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const group = require("./routes/group");
const user = require("./routes/user");
const testSuites = require("./routes/testsuite");
const project = require("./routes/project");
const testcase = require("./routes/testcase");
const testrun = require("./routes/testrun");
const upload = require("./routes/upload");

app.use(cors());
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/api/v1/group", group);
app.use("/api/v1/user", user);
app.use("/api/v1/testSuite", testSuites);
app.use("/api/v1/project", project);
app.use("/api/v1/testcase", testcase);
app.use("/api/v1/testrun", testrun);
app.use("/api/v1/upload", upload);

// Handling CORS erros, allowing any app to use the api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("404 - Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
