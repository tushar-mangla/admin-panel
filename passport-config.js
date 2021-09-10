const Localstrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function init(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    // const pass = getUserByEmail(password);
    // console.log(pass);

    // console.log(password);
    // console.log(user.password);
    // console.log(user.id);
    // console.log("ervrv");

    if (user == null) {
      return done(null, false, { message: "No admin with that email" });
    }

    // bcrypt.compare(password, user.password, (err, isMatch) => {
    //   if (err) throw err;
    //   if (isMatch) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false, { message: "Password incorrect" });
    //   }
    // });
    else if (user.password == password) {
      return done(null, user);
    } else {
      // console.log(user.password);
      // console.log(password);
      return done(null, false, { message: "Password incoorect" });
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
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = init;
