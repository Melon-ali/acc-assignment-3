const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const managerRoute = require("./routes/manager.route");
const adminRoute = require("./routes/admin.route");

//Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/jobs", jobRoute);
app.use("/manager", managerRoute);

app.get("/", (req, res) => {
    res.send("Route is Working...");
});

module.exports = app;