// Note: Using local notification data instead of MongoDB
const notifications = require("../data/notifications.js");

const notification_home = async (req, res) => {
    try {
        let allNotifs = notifications;
        res.render("notifications/index", { allNotifs, page: "all-notification" });
    } catch (error) {
        // console.log("Error while fetching notifications", error);
        req.flash('error', 'Error while fetching notifications')
        res.redirect('/')
    }
}

const notification_new = (req, res) => {
    res.render("notifications/new", { page: "all-notification" });
}

const notification_create = async (req, res) => {
    try {
        // TODO: Implement notification creation logic with data persistence
        // For now, just redirect with success message
        
        req.flash('success', 'Notification Posted Success')
        res.redirect("/notifications");
    } catch (error) {
        // console.log("Error while creating a new notification", error);
        req.flash('error', 'Error while creating a new notification')
        res.redirect('/notifications/new')
    }
}

const notification_delete = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        // TODO: Implement notification deletion logic with data persistence
        // For now, just redirect with success message
        
        req.flash('success', 'Notification Deleted Success')
        res.redirect("/notifications", { allNotifs, page: "all-notification" });
    } catch (error) {
        // console.log("Error while deleting a notification", error);
        // req.flash('error', 'Error while deleting a notification')
        res.redirect('/notifications')
    }
}

module.exports = {
    notification_home,
    notification_new,
    notification_create,
    notification_delete
}
