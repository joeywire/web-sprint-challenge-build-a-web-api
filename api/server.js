const express = require('express');

const middleware = require('./middlewares');
const actionsRouter = require('./actions/actions-router'); 
const projectsRouter = require('./projects/projects-router'); 

const server = express();

//Middleware _)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)
server.use(express.json()); 
server.use(middleware.logger);
//Routes 
// server.use('/api/actions', actionsRouter); 
server.use('/api/projects', projectsRouter); 



//Catch All End Point 
server.get('/', (req, res) => {
    res.send(`<h1> JL-LambdaSchool-API-Sprint </h1>`); 
}); 

module.exports = server;
