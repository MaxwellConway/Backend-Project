const express = require("express");
const session = require("express-session");

const cookieParser = require("cookie-parser");
const { cookieJwtAuth } = require("./middleware/cookieJwtAuth.js");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3001;
const users = require("./routes/users");
const { Users } = require("./models");
const bcrypt = require(`bcrypt`);
const db = require("./models");
const concerts = require("./routes/concerts");
const linkedUserConcerts = require("./routes/linkedUserConcerts");
const authentication = require("./routes/authentication");
const home = require("./routes/home");
const searchResults = require("./routes/searchResults");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // Add this line to serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/views/partials"));
//app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/css"));

app.use("/users", users);
app.use("/concerts", concerts);
app.use("/linkedUserConcerts", linkedUserConcerts);
app.use("/login", authentication);
app.use("/signup", authentication);
app.use("/logout", home);
app.use("/home", home);
app.use("/searchResults", searchResults);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
