const express = require('express');
const todoController = require('../controllers/todoController');
const customerController = require('../controllers/customerController');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router
  .route('/api/v1/todos')
  .get(requiresAuth(), todoController.getAllTodos)
  .post(requiresAuth(), todoController.createTodo);

router.route('/callback').post(todoController.callback);

router
  .route('/api/v1/todos/add')
  .get(requiresAuth(), todoController.createTodoTemplate)
  .post(requiresAuth(), todoController.createTodo);

router
  .route('/api/v1/todos/customers')
  .get(requiresAuth(), customerController.getAllCustomers)
  .post(requiresAuth(), customerController.createCustomer);

router
  .route('/api/v1/todos/customers/add')
  .get(requiresAuth(), customerController.addCustomer);

router
  .route('/api/v1/todos/customers/:id')
  .delete(requiresAuth(), customerController.deleteCustomer);

router
  .route('/api/v1/todos/:id')
  .get(requiresAuth(), todoController.getTodo)
  .post(requiresAuth(), todoController.updateTodo)
  .delete(requiresAuth(), todoController.deleteTodo);

module.exports = router;
