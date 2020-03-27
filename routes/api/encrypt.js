const { Router } = require("express");

const router = Router();
require("dotenv").config();
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}
router.post("/", (req, res) => {
  const { msg } = req.body;
  res.json({ msg: encrypt(msg) });
});

module.exports = router;
