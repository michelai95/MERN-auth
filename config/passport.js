require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const Extract = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {}
options.jwtFromRequest = Extract.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // tell user model to find by id if jwt payload exists
        // if yes return user 
        User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
            // if no return false 
            return done(null, false)
        })
        .catch(err => console.log(err))
        // catch for errors 
    }))
}