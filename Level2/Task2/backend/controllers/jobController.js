const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }
        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Implement createJob, updateJob, and deleteJob functions similarly as getAllJobs and getJobById.
// These functions will handle creating, updating, and deleting job listings respectively.
