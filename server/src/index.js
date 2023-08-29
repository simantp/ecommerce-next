const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const UserRoute = require("./routes/user");

const port = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
const connect = require("./db/connect");
connect();

app.use(UserRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
