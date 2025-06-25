// ! Module setup
let express = require("express"),
    methodOverride = require("method-override"),
    path = require("path"),
    session = require("express-session"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    moment = require("moment");

let app = express();

let flash = require("connect-flash");
app.use(flash());

// ! Session secret (hardcoded)
let SESSION_SECRET_KEY = 'supersecretkey123';

// ! Session Configuration
app.use(
    session({
        secret: SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true //for https not for localhost
            // 1000 milliseconds
            expires: Date.now * 1000 * 60 * 60 * 24,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

//! Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
// Note: You'll need to implement custom authentication strategy
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// ! Server Setup & Middlewares
// connecting to ejs file
app.set("view engine", "ejs");
// use to get URL data
app.use(express.urlencoded({ extended: true }));
// use to override pre build methods (patch & delete)
app.use(methodOverride("_method"));
// public named folder => use this as a static resource, i.e. CSS & JS & Other things
app.use(express.static(path.join(__dirname + "/public")));
// Middleware to pass currentUser to all routes
app.use(function (req, res, next) {
    //* res.local is use to make a variable or object available to all files & folders locally
    res.locals.currentUser = req.user;
    res.locals.moment = moment;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // next is used to go to next step
});

// !Import the routes (Routing logic)
let notificationRoutes = require("./routes/notifications-routes.js");
let questionRoutes = require("./routes/question-routes.js");
let userRoutes = require("./routes/user-routes.js");
let authRoutes = require("./routes/auth-routes.js");
let jobRoutes = require("./routes/jobs-routes.js");
app.use(notificationRoutes);
app.use(questionRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(jobRoutes);

// ! Server Setup
let PORT = process.env.PORT || 3000;

// For Vercel deployment, export the app
module.exports = app;

// Only listen if not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
