require('dotenv').config();
// PACKAGES
const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
// ROUTES
const htmlRoutes = require("./app-api/routes/html.routes");
const routes = require("./app-api/routes/index.routes");

app.use(cors({ origin: true }));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API ROUTES
app.use(htmlRoutes);
app.use("/api", routes);

app.listen(PORT, function () {
    console.log("Listening here: http://localhost:" + PORT);
});
