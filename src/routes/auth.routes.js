"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("passport");
//@ts-ignore
var passport_google_oidc_1 = require("passport-google-oidc");
passport_1.default.use(new passport_google_oidc_1.default({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}, function verify(issuer, profile, cb) {
    console.log("issuer", issuer);
    console.log("profile", profile);
    console.log("cb", cb);
    cb(null, { "name": "John", "email": "john@example.com" });
}));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//         cb(null, { id: user.id, username: user.username, name: user.name });
//     });
// });
//
// passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//         return cb(null, user);
//     });
// });
var router = (0, express_1.Router)();
/* GET /login/federated/accounts.google.com
 *
 * This route redirects the user to Google, where they will authenticate.
 *
 * Signing in with Google is implemented using OAuth 2.0.  This route initiates
 * an OAuth 2.0 flow by redirecting the user to Google's identity server at
 * 'https://accounts.google.com'.  Once there, Google will authenticate the user
 * and obtain their consent to release identity information to this app.
 *
 * Once Google has completed their interaction with the user, the user will be
 * redirected back to the app at `GET /oauth2/redirect/accounts.google.com`.
 */
router.get('/login/federated/google', passport_1.default.authenticate('google'));
/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get('/oauth2/redirect/google', passport_1.default.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));
/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
exports.default = router;
