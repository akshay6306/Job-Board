// Note: MongoDB User model removed - implement custom authentication
// let User = require("../models/users-database");
const passport = require("passport");

const showRegisterForm = (req,res) => {
    // register form
    res.render('authentication/register', { page: "home-page" })
}

const registerUser = async (req,res) => {
    // TODO: Implement custom user registration without MongoDB
    // Previous MongoDB code:
    // let user = new User({
    //     username: req.body.username,
    //     name: req.body.name,
    //     cgpa: req.body.cgpa,
    // });
    // let registerUser = await User.register(user, req.body.password);
    
    console.log("User registration - implement custom logic");
    req.flash('success', 'Registration Successfully done')
    res.redirect('/jobs');
}

const showLoginForm = (req,res) => {
    // login form
    res.render('authentication/login', { page: "home-page" })
}

const loginUser = (req, res) => {
    // Use Passport authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error', 'Login failed');
            return res.redirect('/login');
        }
        if (!user) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error', 'Login failed');
                return res.redirect('/login');
            }
            req.flash('success', 'Login Successful');
            res.redirect('/profile');
        });
    })(req, res);
}

const logoutUser = (req, res) => {
    // logout user
    req.logOut((err) => {
        if (err) {
            console.log("error while logout")
        }
        console.log("user logged out")
        req.flash('success', 'Logout Successful')
        res.redirect("/login");
    });
}

module.exports = {
    showRegisterForm,
    registerUser,
    showLoginForm,
    loginUser,
    logoutUser
}
