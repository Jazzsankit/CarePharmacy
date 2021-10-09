const express = require("express");
const { signUp, login, protectRoute, forgetPassword, resetPasswword } = require("../Controller/authController");
const userRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);

userRouter
  .route("")
  .get(protectRoute,getUserById)
  .patch(protectRoute, updateUserById)
  .delete(protectRoute,deleteUserById);

userRouter
.route("/signup")
.post(signUp)

userRouter.route("/login")
.post(login)

userRouter.post("/forgetpassword" , forgetPassword);
userRouter.patch("/resetpassword/:token" , resetPasswword);

module.exports = userRouter;