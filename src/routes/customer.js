const express = require('express')
const { getAllCustomers, createCustomer } = require('../controllers/customer')

const router = express.Router();

router.route('/').get(getAllCustomers);

router.route('/').post(createCustomer)


module.exports = router;