const { Aes256EcbEncrypt, Aes256EcbDecrypt } = require("crypto-aes-ecb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "Bad Request, either Email or Password field is Empty.",
      });

    const Email = Aes256EcbEncrypt(email, process.env.PRIVATE_KEY);

    const checkUser = await User.findOne({ email: Email });
    // check if user exists
    if (!checkUser)
      return res.status(400).json({ message: "User doesn't exist" });

    // check if password is correct
    const ispwdCorrect = await bcrypt.compare(password, checkUser.password);

    if (!ispwdCorrect)
      return res.status(404).json({ message: "Invalid Email or  Password" });

    const payload = {
      id: checkUser.id,
      email: email,
      mobileNo: Aes256EcbDecrypt(checkUser.mobileNo, process.env.PRIVATE_KEY),
    };

    const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET); // Token will be valid for a day long

    // return the created data with token

    return res.status(200).json({
      payload,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = loginUser;
