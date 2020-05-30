// @flow
const express = require("express");
const cors = require("cors");
const app = express();
const webRoutes = require("./routes/web");

app.use(cors());

app.use(webRoutes);
app.use(express.static("public"));

app.listen(5000);
