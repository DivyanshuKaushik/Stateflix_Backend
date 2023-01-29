import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "dotenv";
import Visitors, { IVisitor } from "./models/Visitor";
import { getCache, setCache } from "./cache";
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
            const visitor = await Visitors.findOne({provider_id:profile.id,provider:profile.provider}).populate("following")
            if(!visitor){
                const newVisitor = new Visitors({
                    provider_id:profile.id,
                    provider:profile.provider,
                    name:profile._json.name,
                    email:profile._json.email,
                    picture:profile._json.picture,
                })
                await newVisitor.save()
                const token = await newVisitor.generateAuthToken();
                newVisitor.token = token as string;
                callback(null,newVisitor)
            }else{
                const token = await visitor.generateAuthToken();
                visitor.token = token as string;
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
    const cacheData = await getCache(`visitor-${user._id}`)
    if(cacheData){
        return done(null,JSON.parse(cacheData as string))
    }
    const visitor = await Visitors.findById(user._id).populate("following");
    const token = await visitor?.generateAuthToken();
    if(visitor){
        await setCache(`visitor-${user._id}`,JSON.stringify(visitor))
        visitor.token = token as string;
    }
    return done(null,visitor);
});
// passport.use(,
//   function(request:Request, accessToken:any, refreshToken:any, profile:any, done:any) {
//     return done(null, profile);
//   }
// ));

export default passport
