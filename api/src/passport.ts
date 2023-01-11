// import passport from 'passport';
// import {Strategy} from 'passport-google-oauth2';
// import {Request} from 'express';
// import {config} from 'dotenv';
// config();
// passport.serializeUser((user , done) => {
//     done(null , user);
// })
// passport.deserializeUser(function(user:any, done) {
//     done(null, user);
// });

// const GoogleStrategy = new Strategy({
//     clientID:process.env.DK_GOOGLE_CLIENT_ID,
//     clientSecret:process.env.DK_GOOGLE_CLIENT_SECRET,
//     callbackURL:"http://localhost:4000/auth/callback",
//     passReqToCallback:true
//   }
  
// passport.use(,
//   function(request:Request, accessToken:any, refreshToken:any, profile:any, done:any) {
//     return done(null, profile);
//   }
// ));