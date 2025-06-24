let express = require("express"),
    passport = require("passport"),
    {
        showRegisterForm,
        registerUser,
        showLoginForm,
        loginUser,
        logoutUser,
    } = require("../controllers/auth-controllers");

let router = express.Router();

router.get("/register", showRegisterForm);

router.post("/register", registerUser);

router.get("/login", showLoginForm);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/profile", (req, res) => {
    res.render("profile", { page: "profile" });
});

module.exports = router;
