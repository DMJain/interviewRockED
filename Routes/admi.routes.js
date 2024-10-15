const express = require('express');

const {getAllCertificates, createCertificates, updateCertificate} = require('../controller/certificates.controller')

const route = express.Router();

route.get('/certificates', getAllCertificates); // to get all certificates

route.post('/certificate', createCertificates); // to create certifictae

route.put('/certificate/:id', updateCertificate)



module.exports = route;