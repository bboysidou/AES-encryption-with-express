const { Router } = require("express");

const router = Router();

require("dotenv").config();
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

function decrypt(text) {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    iv.toString("hex")
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

router.post("/", (req, res) => {
  const { iv, encryptedData } = req.body;
  res.json({ msg: decrypt(encryptedData) });
});

module.exports = router;
