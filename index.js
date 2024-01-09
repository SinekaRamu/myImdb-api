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

app.post(
  "/upload",
  multerupload("").single("file"),
  async function (err, req, res, next) {
    console.log("\n req.file...", req.file);
    const image = req.file;
    if (!image) {
      return next({ status: 400, message: "upload file" });
    }
    console.log(err);
    return res.json({
      file: req.file,
    });
  }
);

//   transporter.sendMail(options, (error, info) => {
//     if (error) console.log("\n mail error..", error);
//     return console.log("\n success...", info);
//   });

//   if (receiver) {
//     return res.json(
//       next({
//         status: 200,
//         message: "sending email",
//       })
//     );
//   }
// });

app.use("/", userRouter);
app.use("/movies", movieRouter);

// 404 handler
app.use(notfound);

// error handler middleware
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
