var express = require('express');
var router = express.Router();
var todos = require('../controll/todos');

/* GET todo listing. */
router.get('/', todos.getTodos);

/* POST todo. */
router.post('/', todos.postTodo);

/* GET todo detail.*/
router.get('/:id', todos.getTodo)

/* update todo. */
router.put('/:id', todos.putTodo);


/* DELETE todo. */
router.delete('/:id', todos.delete);

/**/

module.exports = router;