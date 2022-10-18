const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../db/userSchema");
const { matchPassword } = require("../utils/matchPassword");
const intializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) return done(null, false);
          if (password && (await matchPassword(password, user.password)))
            return done(null, user);
          else return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id); //saves user id in request
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); //gets user from its id.
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = { intializingPassport };
