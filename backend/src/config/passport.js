const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/User.model")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/oauth/google/callback"
}, async (_, __, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value })
  if (!user) user = await User.create({
    name: profile.displayName,
    email: profile.emails[0].value,
    provider: "google"
  })
  done(null, user)
}))

// passport.use(new FacebookStrategy({
//   clientID: process.env.FB_CLIENT_ID,
//   clientSecret: process.env.FB_CLIENT_SECRET,
//   callbackURL: "/api/auth/facebook/callback",
//   profileFields: ["id", "emails", "name"]
// }, async (_, __, profile, done) => {
//   let user = await User.findOne({ email: profile.emails[0].value })
//   if (!user) user = await User.create({
//     name: profile.name.givenName,
//     email: profile.emails[0].value
//   })
//   done(null, user)
// }))
