const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const debug = require('debug')('passport')
const User = require('../models/user.js')

User.findOne({ username: 'test' }, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...')
        testUser = new User({
            username: 'test',
            password: 'test'
        })
        testUser.save()
    }
})
User.findOne({ username: 'test1' }, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...')
        testUser = new User({
            username: 'test1',
            password: 'test1'
        })
        testUser.save()
    }
})
User.findOne({ username: 'test2' }, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...')
        testUser = new User({
            username: 'test2',
            password: 'test2'
        })
        testUser.save()
    }
})
User.findOne({ username: 'test3' }, function (err, testUser) {
    if (!testUser) {
        console.log('test user did not exist; creating test user...')
        testUser = new User({
            username: 'test3',
            password: 'test3'
        })
        testUser.save()
    }
})

passport.serializeUser(function(user = {}, done) {
    // console.log('serializeUser', user)
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    // console.log('deserializeUser', id)
    User.findById(id, done);
})
 
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done) {
        debug('LocalStrategy', username, password)
        User.findOne({ username: username, password: password }, done);
}))

module.exports = passport