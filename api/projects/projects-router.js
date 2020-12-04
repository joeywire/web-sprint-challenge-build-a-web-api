const express = require('express');
const Project = require('./projects-model'); 

const router=express.Router();


//ENDPOINTS 
router.get('/', async (req, res) => {
    try { 
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router; 