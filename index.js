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
let SESSION_SECRET_KEY = process.env.SESSION_SECRET || 'supersecretkey123';

// ! Session Configuration
app.use(
    session({
        secret: SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    })
);

//! Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Simple session-based authentication (replacing Passport)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Simple authentication strategy
passport.use(new localStrategy((username, password, done) => {
    // For demo purposes, accept any login
    // In production, implement proper user validation
    return done(null, { username: username, isAdmin: true });
}));

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

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
