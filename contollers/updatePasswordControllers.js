const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword && !newPassword)
      return res.status(403).json({ message: "Bad Request" });

    const user = await User.findById(req.id);
    if (!user)
      return res.status(401).json({ message: "Unauthorized access forbidden" });

    const matchOldPwd = await bcrypt.compare(oldPassword, user.password);

    if (!matchOldPwd)
      return res.status(403).json({
        message: "Old password doesnot match to one which is in existence",
      });
    const pwd = bcrypt.hashSync(newPassword, 8);
    await user.updateOne({ password: pwd });
    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

module.exports = updatePassword;
