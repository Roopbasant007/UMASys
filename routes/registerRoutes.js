const registerRouter = require("express").Router();

const registerUser = require("../contollers/registerContollers");

registerRouter.post("/signup", registerUser);

module.exports = registerRouter;
