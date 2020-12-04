const Action = require('./actions/actions-model'); 
const Project = require('./projects/projects-model'); 

//GLOBAL MIDDLEWARE
const logger = (req, res, next) => {
    // log request method, request url and timestamp 
    // run on every request 
    var today = new Date();
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(`Method: ${req.method} - Request URL: ${req.url} - Time of Request: ${time}`); 
    next();
}

//ACTIONS MIDDLEWARE
const validateProjIdFromBody = async (req, res, next) => {
    const { project_id } = req.body;
    try { 
        const project = await Project.get(project_id);
        if (!project) { 
            res.status(404).json({ message: `No project with id ${project_id} was found`});
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const validateActionsId = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const action = await Action.get(id); 
        if (!action) {
            res.status(404).json({ message: `No Action with id: ${id} found`});
        }else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const validateActionBody = (req, res, next) => {
    const { body } = req; 
    if (!body.project_id || !body.description || !body.notes) {
        res.status(400).json({message: 'Include all required fields - project_id, description, and notes!'}); 
    } else {
        next();
    }
}

//PROJECT MIDDLEWARE
const validateProjId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.get(id);
        if (!project) {
            res.status(404).json({ message: `No Project with id: ${id} found`});
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const validateProjectBody = (req, res, next) => {
    const { body } = req; 
    if (!body.name || !body.description) { 
        res.status(400).json({ message: 'Include all required fields - name and description - SPELLING!'})
    } else {
        next();
    }
}

module.exports = {
    logger,
    validateProjIdFromBody, 
    validateActionsId, 
    validateActionBody, 
    validateProjId, 
    validateProjectBody
}