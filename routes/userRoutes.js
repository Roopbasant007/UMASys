const userRouter = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT");

const updatePassword = require("../contollers/updatePasswordControllers");
const updateUserDetails = require("../contollers/updateUserDetails");

userRouter.put("/Password", verifyJWT, updatePassword);
userRouter.put("/User/Details", verifyJWT, updateUserDetails);

module.exports = userRouter;
