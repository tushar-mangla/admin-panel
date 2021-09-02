const Localstrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function init(passport, getUserByEmail, getUserByPass) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    // console.log(user);
    if (user == null) {
      return done(null, false, { message: "No admin with that email" });
    }

    try {
      console.log(password);
      console.log(user.password);
      console.log("rrvrv");
      if (user.password == password) {
        // console.log(user.password, "eve");
        // console.log(password);
        return done(null, user);
      } else {
        console.log("dvvfvfvfv");
        return done(null, false, { message: "Password incoorect" });
      }
    } catch (e) {
      return done(`fdfbfbbfb ${e}`);
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
  passport.serializeUser((user, done) => done(null, user.password));
  passport.deserializeUser((pass, done) => {
    return done(null, getUserByPass(pass));
  });
}

module.exports = init;
