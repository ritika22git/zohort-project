const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const tasksCtrl = require('../controllers/tasksController');

router.use(auth); // all routes behind auth
router.get('/', tasksCtrl.getTasks);
router.post('/', validate, tasksCtrl.createTask);

// PUT /tasks/:id
router.put('/:id', validate, tasksCtrl.updateTask);

// DELETE /tasks/:id
router.delete('/:id', tasksCtrl.deleteTask);

module.exports = router;
