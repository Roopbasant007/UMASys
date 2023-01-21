// for Encrytion and Decryption
const { Aes256EcbEncrypt } = require("crypto-aes-ecb");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

async function registerUser(req, res) {
  try {
    // Check if all fields exists
    const { firstName, midName, lastName, phone, email, password } = req.body;
    if (!firstName || !email || !password)
      return res.status(400).json({ message: "Bad Request" });

    // Check if User email already exists
    const Email = Aes256EcbEncrypt(email, process.env.PRIVATE_KEY);

    console.log(Email);

    const checkUser = await User.findOne({ email: Email });
    if (checkUser)
      return res.status(400).json({ message: "User Already Exists" });

    const fName = Aes256EcbEncrypt(firstName, process.env.PRIVATE_KEY);
    const mName = Aes256EcbEncrypt(midName, process.env.PRIVATE_KEY);
    const lName = Aes256EcbEncrypt(lastName, process.env.PRIVATE_KEY);
    const mobNo = Aes256EcbEncrypt(phone, process.env.PRIVATE_KEY);
    const eMail = Aes256EcbEncrypt(email, process.env.PRIVATE_KEY);

    const newUser = new User({
      fname: fName,
      midName: mName,
      lName: lName,
      email: eMail,
      password: bcrypt.hashSync(password, 8),
      mobileNo: mobNo,
    });

    await newUser.save();
    return res.status(201).json("User Registration successful");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = registerUser;
