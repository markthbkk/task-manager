const express = require('express');
const todoController = require('../controllers/todoController');
const customerController = require('../controllers/customerController');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router
  .route('/')
  .get(requiresAuth(), todoController.getAllTodos)
  .post(requiresAuth(), todoController.createTodo);

router.route('/callback').post(requiresAuth(), todoController.callback);

router
  .route('/add')
  .get(requiresAuth(), todoController.createTodoTemplate)
  .post(requiresAuth(), todoController.createTodo);

router
  .route('/customers')
  .get(requiresAuth(), customerController.getAllCustomers)
  .post(requiresAuth(), customerController.createCustomer);

router
  .route('/customers/add')
  .get(requiresAuth(), customerController.addCustomer);

router
  .route('/customers/:id')
  .delete(requiresAuth(), customerController.deleteCustomer);

router
  .route('/:id')
  .get(requiresAuth(), todoController.getTodo)
  .post(requiresAuth(), todoController.updateTodo)
  .delete(requiresAuth(), todoController.deleteTodo);

module.exports = router;
