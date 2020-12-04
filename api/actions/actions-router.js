const express = require('express');
const Action = require('./actions-model'); 

const router = express.Router(); 

//ENDPOINTS 
//CREATE

//READ
router.get('/', async (req, res) => {
    try { 
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
//UPDATE

//DELETE

module.exports = router; 