const Todo = require('./../models/todoModel');
const Customer = require('./../models/customerModel');

function formatCreatedTimestamp(todo) {
  const dateObject = new Date(todo.created).toLocaleString().replace(',', '');
  todo.friendlyDate = dateObject;
  console.log(todo.friendlyDate);
}

exports.getAllTodos = async (req, res) => {
  console.log('Getting Requested Todos');

  try {
    let skip = req.query.skip;
    let limit = req.query.limit;
    let customer = req.query.customer;
    let status = req.query.status;
    let sort = req.query.sort;

    console.log(status);

    let queryObj = {};

    if (!skip) {
      skip = 0;
    }
    if (!limit) {
      limit = 100;
    }

    // Sort options

    if (!sort) {
      sort = '-created';
    }

    // May also want to sort by Customer, Status, or Order

    // Filter options

    if (status) {
      queryObj['status'] = status;
    }

    if (status == 'All') {
      queryObj = {};
    }

    if (customer) {
      queryObj['customer'] = customer;
    }

    console.log(queryObj);
    // Process the query with pagination and sort options set to defaults if not defined by client

    const Todos = await Todo.find(queryObj)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();

    Todos.forEach(formatCreatedTimestamp);

    console.log(Todos);

    res
      .status(200)
      .render('showAllTodos', { layout: 'main', displayItems: Todos });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    const customers = await Customer.find();
    let customersArray = customers.filter(
      (el) => el.customer !== todo.customer
    );
    customersArray.unshift({ customer: todo.customer });

    console.log(customersArray);
    // res.status(200).json({
    //   status: 'success',
    //   data: todo,
    // });
    console.log(todo);

    res.render('createEditTodo', {
      layout: 'createEditMain',
      documentTitle: todo.title,
      customers: customersArray,
      description: todo.description,
      created: new Date(todo.created).toLocaleString().replace(',', ''),
      documentID: todo._id,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    req.body.status = 'Open';

    const newTodo = await Todo.create(req.body);

    const customersArray = await Customer.find();

    res.render('createEditTodo', {
      layout: 'createEditMain',
      customers: customersArray,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTodo = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.render('showSingleTodo', {
      layout: 'main',
      title: todo.title,
      customer: todo.customer,
      description: todo.description,
      created: new Date(todo.created).toLocaleString().replace(',', ''),
      documentID: todo._id,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  console.log(req.params.id);

  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTodoTemplate = async (req, res) => {
  console.log('STARTING');
  try {
    const customersArray = await Customer.find();

    console.log(customersArray);

    res.render('createEditTodo', {
      layout: 'createEditMain',
      customers: customersArray,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
