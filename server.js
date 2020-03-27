const express = require("express");

const app = express();

const PORT = 5000;
app.use(express.json());
app.use("/api/encrypt", require("./routes/api/encrypt"));
app.use("/api/decrypt", require("./routes/api/decrypt"));

app.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
