const { Aes256EcbEncrypt } = require("crypto-aes-ecb");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

async function updateUserDetails(req, res) {
  try {
    // Check if all fields exists
    const { firstName, midName, lastName, phone, email } = req.body;
    if (!firstName || !email)
      return res.status(400).json({ message: "Bad Request" });

    // Check if User email already exists

    const fName = Aes256EcbEncrypt(firstName, process.env.PRIVATE_KEY);
    const mName = Aes256EcbEncrypt(midName, process.env.PRIVATE_KEY);
    const lName = Aes256EcbEncrypt(lastName, process.env.PRIVATE_KEY);
    const mobNo = Aes256EcbEncrypt(phone, process.env.PRIVATE_KEY);
    const eMail = Aes256EcbEncrypt(email, process.env.PRIVATE_KEY);

    await User.findByIdAndUpdate(req.id, {
      fname: fName,
      midName: mName,
      lName: lName,
      mobileNo: mobNo,
      email: eMail,
    });
    return res.status(201).json("User profile updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateUserDetails;
