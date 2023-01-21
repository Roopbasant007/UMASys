const loginRouter = require("express").Router();

const loginUser = require("../contollers/authContollers");

loginRouter.post("", loginUser);

module.exports = loginRouter;
