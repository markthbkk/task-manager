const express = require('express');
const todoController = require('../controllers/todoController');
const customerController = require('../controllers/customerController');
const router = express.Router();

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

router
  .route('/add')
  .get(todoController.createTodoTemplate)
  .post(todoController.createTodo);

router
  .route('/customers')
  .get(customerController.getAllCustomers)
  .post(customerController.createCustomer);

router.route('/customers/add').get(customerController.addCustomer);

router.route('/customers/:id').delete(customerController.deleteCustomer);

router
  .route('/:id')
  .get(todoController.getTodo)
  .post(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
