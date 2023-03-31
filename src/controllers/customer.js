const Customer = require('../models/customers');
const { StatusCodes } = require('http-status-codes');
const { validate } = require('../models/customers');

const getAllCustomers = async (req, res) => {
    try{
        const Customers = await customer.find();
        res.status(StatusCodes.OK).json(customers);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({error: err.message});
    }
}

const createCustomer = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
    
    let customer = new customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save

    res.status(StatusCodes.CREATED).json(customer)
}

module.exports = {
    getAllCustomers,
    createCustomer
}