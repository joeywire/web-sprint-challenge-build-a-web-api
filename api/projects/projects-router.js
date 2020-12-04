const express = require('express');
const Project = require('./projects-model'); 
const middleware = require('../middlewares');
const { validateProjectBody } = require('../middlewares');


const router=express.Router();


//ENDPOINTS 

router.post('/', middleware.validateProjectBody, async (req, res) => {
    const { body } = req; 
    try { 
        const newProj = await Project.insert(body); 
        res.status(200).json(newProj);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try { 
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', middleware.validateProjId, async (req, res) => {
    const { id } = req.params;
    try { 
        const projects = await Project.get(id);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id/actions', middleware.validateProjId, async (req, res) => {
    const { id } = req.params; 
    try { 
        const projActions = await Project.getProjectActions(id); 
        res.status(200).json(projActions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', middleware.validateProjId, validateProjectBody, async (req, res) => {
    const { id } = req.params; 
    const { body } = req; 
    try { 
        const updatedProj = await Project.update(id, body); 
        res.status(200).json(updatedProj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 });

 router.delete('/:id', middleware.validateProjId, async (req, res) => {
     const { id } = req.params;
     try {
         const deletion = await Project.remove(id); 
         res.status(200).json(deletion);
     } catch (err) {
        res.status(500).json({ message: err.message });
     }
 });


module.exports = router; 