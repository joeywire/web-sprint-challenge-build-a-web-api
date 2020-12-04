function logger(req, res, next) {
    // log request method, request url and timestamp 
    // run on every request 
    var today = new Date();
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(`Method: ${req.method} - Request URL: ${req.url} - Time of Request: ${time}`); 
    next();
};

module.exports = {
    logger
}