const Localstrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function init(passport, getIserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = getIserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No admin with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incoorect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new Localstrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((user, done) => {});
}

module.exports = init;
