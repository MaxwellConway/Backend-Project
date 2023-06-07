const express = require("express");
const app = express();
const PORT = 3001;
const users = require("./routes/users");
const concerts = require("./routes/concerts");
const linkedUserConcerts = require("./routes/linkedUserConcerts");
const authentication = require("./routes/authentication");
const home = require("./routes/home");

app.use(express.json());
app.use(express.static("public")); // Add this line to serve static files from the 'public' directory

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// where tf does this go
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Replace with your authentication logic
    // Find user in the database and verify password
    // Call done() with user object if authenticated, otherwise call done() with false
  })
);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use("/home", home);

async function getConcerts() {
  const concerts = await fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=rock&size=100&dmaId=220&apikey=83FaiAZhCP41A21Ku8BCVMDVxlV9UOO8",
    {
      method: "GET",
    }
  );

  const json = await concerts.json();
  const concertsArray = json._embedded.events[82];
  //console.log(concertsArray);
  //return concertsArray;
}

console.log(getConcerts());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
