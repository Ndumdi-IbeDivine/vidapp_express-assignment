const { Customer } = require('../models/customers'); 
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const joiSchema = Joi.object ({
  name: Joi.string().min(5).max(50).required(),
  phone: Joi.string().min(5).max(50).required(),
  isGold: Joi.boolean()
});


router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {

  const validatedCustomer = joiSchema.validate({...req.body});
  if (validatedCustomer.error) return res.status(400).send(validatedCustomer.error.details[0].message);


  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const validatedCustomer = joiSchema.validate({...req.body});
  if (validatedCustomer.error) return res.status(400).send(validatedCustomer.error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 