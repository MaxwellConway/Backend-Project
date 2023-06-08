const express = require("express");
const app = express();
const PORT = 3001;
const users = require("./routes/users");
const { Users } = require("./models");
const bcrypt = require(`bcrypt`);
const db = require("./models");
const concerts = require("./routes/concerts");
const linkedUserConcerts = require("./routes/linkedUserConcerts");
const authentication = require("./routes/authentication");
const home = require("./routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // Add this line to serve static files from the 'public' directory

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const myStore = new SequelizeStore({
  db: db.sequelize,
});

app.use(
  session({
    secret: "keyboard cat",
    store: myStore,
    resave: false,
    proxy: true,
  })
);
myStore.sync();

// where tf does this go
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Field name for the email in the request body
      passwordField: "password", // Field name for the password in the request body
    },

    async (email, password, done) => {
      try {
        // Find the user by email
        const userToFind = await Users.findOne({
          where: {
            email: email,
          },
        });
        // Check if the user exists and compare the password
        if (!userToFind) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }
        const passwordMatch = await bcrypt.compare(
          password,
          userToFind.password
        );
        if (passwordMatch) {
          return done(null, userToFind); // User authenticated successfully {id:name,created}
        } else {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userToFind = await Users.findOne({
      where: {
        id: id,
      },
    });
    done(null, userToFind);
  } catch (error) {
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());

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
