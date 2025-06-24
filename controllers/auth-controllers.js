// Note: MongoDB User model removed - implement custom authentication
// let User = require("../models/users-database");

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
    // TODO: Implement custom login logic without MongoDB
    console.log("user logged in")
    req.flash('success', 'Login Successful')
    res.redirect('/profile');
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