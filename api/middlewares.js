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

//PROJECT MIDDLEWARE


module.exports = {
    logger,
    validateProjIdFromBody, 
    validateActionsId
}