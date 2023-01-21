require("dotenv").config();
var cryptojs = require("crypto-js");

var data = {
  email: "roop123@gmail.com",
  password: "Roop@123",
  mobileNo: 9918611488,

  fullName: {
    fname: "Roop",
    lname: "Basant",
  },
};

const Sk = process.env.PRIVATE_KEY;

// var ciphertext = cryptojs.AES.encrypt(JSON.stringify(data), Sk).toString();

// console.log(ciphertext);

// var bytes = cryptojs.AES.decrypt(ciphertext, Sk);

// var decryptedData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

// console.log(decryptedData);

//

// var cryptojs = require("crypto-js");

var data1 = "my message is for Roop";
var data2 = "Hello this is dev";

var ciphertext1 = cryptojs.DES.encrypt(data1, Sk).toString();
var ciphertext2 = cryptojs.DES.encrypt(data1, Sk).toString();
var ciphertext3 = cryptojs.console.log(ciphertext2);

var bytes = cryptojs.AES.decrypt(ciphertext1, Sk);

var decryptedData = bytes.toString(cryptojs.enc.Utf8);

console.log(decryptedData);
