const express = require("express");
const { isLoggedIn, logout } = require("../Controller/authController");
const {  getHomePage, getLoginPage, getPlansPage, getResetPage } = require("../Controller/viewController");

const viewRouter = express.Router();

viewRouter.use(isLoggedIn);

viewRouter.route("/").get(getHomePage);
viewRouter.route("/home").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/resetpassword/:token").get(getResetPage);


module.exports = viewRouter;