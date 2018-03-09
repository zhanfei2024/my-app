var model = require('../models/index');

exports.getTodos = function(req, res, next) {
    model.Todo.findAll({})
        .then(todos => res.json({
            error: false,
            data: todos
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};


exports.getTodo = function (req, res, next) {
    const todo_id = req.params.id;
    model.Todo.findById(todo_id)
        .then(todo => res.json({
            error: false,
            data: todo
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }))
};

exports.postTodo = function(req, res, next) {
    const {
        title,
        description
    } = req.body;
    model.Todo.findOrCreate({
        where: {title: title},
        defaults: {description: description}
    }).spread(function (todo, created) {
        if (created) {
            res.status(201).json({
                error: false,
                data: todo,
                message: 'New todo has been crated!'
            })
        } else {
            res.json({
                error: true,
                data: [],
                message: 'todo alrady is exit'
            })
        }
    })
};


exports.putTodo = function(req, res, next) {
    const todo_id = req.params.id;
    const {
        title,
        description
    } = req.body;
    model.Todo.update({
        title: title,
        description: description
    }, {
        where: {
            id: todo_id
        }
    })
        .then(todo => res.status(201).json({
            error: false,
            message: 'todo has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

exports.delete = function(req, res, next) {
    const todo_id = req.params.id;
    console.log(todo_id, '-----------------')
    model.Todo.destroy({where: {
        id: todo_id
    }})
        .then(status => res.status(201).json({
            error: false,
            message: 'todo has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};