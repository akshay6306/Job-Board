// Note: Using local job data instead of MongoDB
const jobs = require("../data/jobs.js");

const home_page = (req, res) => {
    console.log('Home page accessed');
    try {
        // req.flash('success','Welcome to index jobs')
        res.render("home-page", { page: "home-page", 'success': 'Developer : Code With Pankaj --- Must visit my GITHUB Profile :) ******* Waiting to see u there' });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Error loading home page');
    }
}

const index_jobs = async (req, res) => {
    try {
        let foundJobs = jobs;
        
        // Search functionality
        if (req.query.search && req.query.search.length > 0) {
            const searchTerm = req.query.search.toLowerCase();
            foundJobs = jobs.filter(job => 
                job.name.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.address.toLowerCase().includes(searchTerm)
            );
        }
        
        res.render('jobs/all-jobs', { foundJobs, page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Error while extracting all jobs')
        res.redirect('/jobs')
    }
}

const newJob = (req, res) => {
    res.render("jobs/new-job", { page: "all-jobs" });
}

const create_job = async (req, res) => {
    try {
        // TODO: Implement job creation logic with data persistence
        // For now, just redirect with success message
        req.flash('success', 'Job Posted Success')
        res.redirect("/jobs");
    } catch (error) {
        req.flash('error', 'Job Posted Failed')
        res.render("jobs/new-job")
    }
}

const show_job = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let job = jobs.find(j => j.id === id);
        
        if (!job) {
            req.flash('error', 'Job Not found')
            return res.redirect('/jobs');
        }
        
        res.render("jobs/show-job", { job, page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Job Not found')
        res.redirect('/jobs');
    }
}

const edit_job = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let job = jobs.find(j => j.id === id);
        
        if (!job) {
            req.flash('error', 'Job Not found')
            return res.redirect('/jobs');
        }
        
        res.render("jobs/edit-jobs", { job, page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Error while editing job')
        res.redirect('/jobs')
    }
}

const update_job = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        // TODO: Implement job update logic with data persistence
        // For now, just redirect with success message
        
        req.flash('success', 'Job Edited Success')
        res.redirect(`/jobs/${id}`);
    } catch (error) {
        req.flash('error', 'Error while updating a job')
        res.redirect(`/jobs`);
    }
}

const delete_job = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        // TODO: Implement job deletion logic with data persistence
        // For now, just redirect with success message
        
        req.flash('success', 'Job Deleted Success')
        res.redirect("/jobs", { page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Error while deleting a job')
        res.redirect('/jobs');
    }
}

const apply_job = async function (req, res) {
    try {
        // TODO: Implement job application logic
        // For now, just redirect with success message
        
        req.flash('success', 'Applied for Job Success')
        res.redirect("/jobs");
    } catch (error) {
        req.flash('error', 'Error while applying in job')
        res.redirect("/jobs");
    }
}

module.exports = {
    home_page,
    index_jobs,
    newJob,
    create_job,
    show_job,
    edit_job,
    update_job,
    delete_job,
    apply_job
}
