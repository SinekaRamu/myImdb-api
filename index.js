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

const generateOTP = () => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

app.post("/forget-password", async function (req, res) {
  const url = "/forget-password";
  const otp = generateOTP();
  const receiver = req.body.email;
  const options = {
    from: `sender<${mailConfig.email}>`,
    to: receiver,
    subject: "test mail",
    text: "test content", // plain text body
    // html: `<p>Password forget validation ${otp} </p>
    //  <a href="${url}" target="_blank">View</a>`, // html body
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log("\n mail error..", error);
    return console.log("\n success...", info);
  });

  if (receiver) {
    return res.json(
      next({
        status: 200,
        message: "sending email",
      })
    );
  }
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
