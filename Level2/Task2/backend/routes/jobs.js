const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/auth');

// GET route to fetch all jobs
router.get('/jobs', jobController.getAllJobs);

// GET route to fetch a single job by ID
router.get('/jobs/:id', jobController.getJobById);

// POST route to create a new job (requires authentication)
router.post('/jobs', authMiddleware.authenticateUser, jobController.createJob);

// PUT route to update a job (requires authentication)
router.put('/jobs/:id', authMiddleware.authenticateUser, jobController.updateJob);

// DELETE route to delete a job (requires authentication)
router.delete('/jobs/:id', authMiddleware.authenticateUser, jobController.deleteJob);

module.exports = router;
