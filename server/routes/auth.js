const express = require('express')
const passport = require('passport')
const Router = express.Router()

//client url for google callback
CLIENT_URL = 'http://localhost:5173'

//Login existing users. Using bcrypt compare now instead of passport local
//app is small enough to justify not using passport
Router.post(
    '/login', 
    passport.authenticate('local'),
    (req, res) => {
        res.send('ok')
    }
);

//simple get request to check if a user is authenticated and retrieve user information
Router.get(
    '/getuser',
    (req,res) => {
        res.send(req.user)
    }
)

//logout user 
Router.get(
    "/logout", 
    (req, res) => {
        req.logout()
        res.send('success')
    }
)

//google login authentication
Router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//google callback function after user is authenticated
Router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('http://localhost:5173');
})

module.exports = Router