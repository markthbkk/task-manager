const Customer = require('./../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  console.log('Getting Customers');
  try {
    // const sort = '-customerName';

    //   const Customers = await Customer.find().sort(sort).exec();

    const Customers = await Customer.find();

    Customers.forEach((customer) => console.log(customer));

    res.render('showAllCustomers', {
      layout: 'customerMain',
      displayItems: Customers,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCustomer = async (req, res) => {
  console.log('Creating Customer');
  console.log(req.body);

  try {
    const newCustomer = await Customer.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

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

exports.addCustomer = async (req, res) => {
  try {
    res.render('addCustomer', {
      layout: 'customerMain',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCustomer = async (req, res) => {
  console.log(req.body.customer);

  try {
    // const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const customerDoc = await Customer.create({ customer: req.body.customer });

    res.render('addCustomer', {
      layout: 'customerMain',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
