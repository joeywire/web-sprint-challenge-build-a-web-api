const Action = require('./actions/actions-model'); 
const Project = require('./projects/projects-model'); 

const logger = (req, res, next) => {
    // log request method, request url and timestamp 
    // run on every request 
    var today = new Date();
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(`Method: ${req.method} - Request URL: ${req.url} - Time of Request: ${time}`); 
    next();
}

const validateProjID = async (req, res, next) => {
    const { project_id } = req.body;
    try { 
        const project = await Project.get(project_id);
        if (!project) { 
            res.status(404).json({ message: `No project with id ${project_id} was found`});
        } 
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    logger,
    validateProjID
}