const express = require('express');
const todoController = require('../controllers/todoController');
const customerController = require('../controllers/customerController');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router
  .route('/')
  .get(requiresAuth(), todoController.getAllTodos)
  .post(todoController.createTodo);

router.route('/callback').post(todoController.callback);

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
