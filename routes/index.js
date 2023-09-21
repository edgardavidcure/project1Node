const routes = require('express').Router();
const contact = require('./contact');
routes.use('/', require('./swagger'));
routes.use('/contacts', contact);
routes.get('/', (req, res) => {
  let docData = 'Hello World';
  res.send(docData);
});

module.exports = routes;
