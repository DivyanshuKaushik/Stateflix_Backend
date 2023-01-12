import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "dotenv";
import Visitors, { IVisitor } from "./models/Visitor";
config();

const GoogleStrategy = new Strategy(
    {
        clientID: process.env.DK_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.DK_GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/api/v1/auth/google/callback",
        scope: ["profile", "email"],
    },
    async function (accessToken:any, refreshToken:any, profile:any, callback:any) {
        try{
            const visitor = await Visitors.findOne({provider_id:profile.id,provider:profile.provider})
            console.log(visitor)
            if(!visitor){
                const newVisitor = new Visitors({
                    provider_id:profile.id,
                    provider:profile.provider,
                    name:profile._json.name,
                    email:profile._json.email,
                    picture:profile._json.picture,
                })
                await newVisitor.save()
                callback(null,newVisitor)
            }else{
                callback(null, visitor);

            }

        }catch(err){
            callback(err,null)
        }
    }
);
passport.use(GoogleStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser(async function (user: IVisitor, done) {
    const visitor = await Visitors.findById(user._id);
    done(null, visitor);
});
// passport.use(,
//   function(request:Request, accessToken:any, refreshToken:any, profile:any, done:any) {
//     return done(null, profile);
//   }
// ));

export default passport
