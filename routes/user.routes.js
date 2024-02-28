const express = require("express");
const router = express.Router();

const {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
  updatePasswordController,
} = require("../controllers/user.controller");
const { validate } = require("../middleware/validation.middleware");
const {
  signUpSchema,
  updateUserSchema,
  loginSchema,
  updatePasswordSchema,
} = require("../validations/authentication.schema");
const { isAuthorised } = require("../middleware/authorization.middleware");
const {
  forgetPassword,
  otpVerification,
} = require("../controllers/fortgetPassword.controller");

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

//LOGIN
router.post("/login", validate(loginSchema), loginController);

//UPDATE USER DATA
router.put(
  "/users/u",
  isAuthorised,
  validate(updateUserSchema),
  updateUserController
);
router.patch(
  "/users/u/password",
  isAuthorised,
  validate(updatePasswordSchema),
  updatePasswordController
);

router.post("/forget-password", forgetPassword);
router.post("/verify/otp/:id", otpVerification);

//VIEW THE USER DATA
router.get("/users/u", isAuthorised, getAccountController);

module.exports = router;
