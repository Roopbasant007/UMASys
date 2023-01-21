require("dotenv").config();
// Includes crypto module
const { Aes256EcbEncrypt, Aes256EcbDecrypt } = require("crypto-aes-ecb");

const message = "123673864";
const key = process.env.IV;
// "secretkey16bytessecretkey16bytes";
const encryptMessage = Aes256EcbEncrypt(message, key);
console.log(encryptMessage);
const enc = Number(encryptMessage);
console.log(typeof enc);
const result = Aes256EcbDecrypt(encryptMessage, key);
console.log(result); // Hello
