const express = require('express');
const Action = require('./actions-model'); 
const middleware = require('../middlewares');

const router = express.Router(); 

//ENDPOINTS 
//CREATE
router.post('/', middleware.validateProjID, async (req, res) => {
    const { body } = req;
    console.log(body);
    try { 
        const newAction = await Action.insert(body);
        res.status(200).json(newAction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
//READ
router.get('/', async (req, res) => {
    try { 
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try { 
        const actions = await Action.get(id);
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
//UPDATE
router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const { body } = req; 
    try { 
        const updatedAction = await Action.update(id, body);
        res.status(200).json(updatedAction); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try { 
        const deleted = await Action.remove(id);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router; 