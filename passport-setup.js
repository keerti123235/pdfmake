const passport=require('passport')
const GoogleStarategy=require('passport-google-oauth2').Strategy
passport.serializeUser(function(user, done) {
    
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
  
    done(null, user);
});

passport.use(new GoogleStarategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
},function(request,accessToken,refreshToken,profile,done){
    console.log(profile)
    return done(null,profile)
}
))

