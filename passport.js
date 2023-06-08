const passport = require(`passport`);

function authenticate(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // if (!user) {
    //   return res.status(401).json({
    //     message: "Email or password did not match. Please fry again. 123",
    //   });
    // }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
}

module.exports = authenticate;
