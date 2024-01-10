const bodyParser = require("body-parser");
const config = require("./config/config");
const { mailConfig, transporter } = require("./config/email-config");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const { notfound } = require("./middleware/notfound.middleware");
const { errorHandler } = require("./middleware/errorhandler.middleware");
const userRouter = require("./routes/user.routes");
const movieRouter = require("./routes/movie.routes");
const { multerupload } = require("./middleware/multerUpload.middleware");
const path = require("path");

const app = express();

app.use(morgan("dev"));
// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", userRouter);
app.use("/movies", movieRouter);

// 404 handler
app.use(notfound);

// error handler middleware
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
