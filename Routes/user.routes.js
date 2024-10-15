const express = require('express');

const {getActiveCertificates, createUserEnrtollment} = require('../controller/certificates.controller')

const route = express.Router();

route.get('/certificates', getActiveCertificates); // to get all certificates
route.post('/certificate/:id', createUserEnrtollment);

module.exports = route;