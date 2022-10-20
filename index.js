const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");


mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log(`Database Connected...`.red.bold);
});


const port = process.env.PORT || 5000;
const crypto = require("crypto");

app.listen(port, () => {
    console.log(`Port Connected...${port}`.green.bold);
});