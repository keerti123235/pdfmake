//Import the required modules
require('dotenv').config()
const express = require('express');
const bodyParser=require('body-parser');
const app = express()
const passport = require('passport');
const cookieSession = require('cookie-session')

require('./passport-setup');

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

//Function which checks if the user is logged in successfully
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.render('pages/index'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))


app.get('/good', isLoggedIn, (req, res) =>{
    res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // If it is successful authenication then redirect to 'good' page
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.get('/main', (req, res) => res.render('pages/main'))

const pdfRoute = require('./routes/pdfmake');
app.use('/pdfMake', pdfRoute);

app.listen(5000, () => console.log(`Server listening on port ${5000}!`))
