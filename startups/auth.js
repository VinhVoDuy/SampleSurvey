const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');

passport.use(new FacebookStrategy({
  clientID: '506153643447733',
  clientSecret: "cdc91c07f205eaf69cfe28cd992b4300",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(`Access token: ${accessToken}, refreshToken: ${refreshToken}`);
    User.findOrCreate({
      where: {
        facebookId: profile.id
      },
      defaults: {
        email: profile.emails,
        facebookId: profile.id
      }
    }).then((user) => { cb(null, user[0]) })
      .catch((err) => { cb(err) });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
