var express = require('express');
var route = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller');

route.get('/', index);
route.get('/create', viewCreate);
route.post('/create', actionCreate);
route.get('/edit/:id', viewEdit);
route.put('/edit/:id', actionEdit);
route.delete('/delete/:id', actionDelete);

module.exports = route;
