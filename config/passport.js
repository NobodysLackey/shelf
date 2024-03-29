const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return cb(err)
        if (user) {
          if (!user.avatar) {
            user.avatar = profile.photos[0].value
            user.save((err) => {
              return cb(null, user)
            })
          } else {
            return cb(null, user)
          }
        } else {
          // we have a new user via OAuth!
          let newUser = new User({
            name: profile.displayName,
            avatar: profile.photos[0].value,
            googleId: profile.id
          })
          newUser.save((err) => {
            if (err) return cb(err)
            return cb(null, newUser)
          })
        }
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
