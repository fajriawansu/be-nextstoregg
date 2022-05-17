var express = require('express');
var route = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete, actionStatus } = require('./controller');
const multer = require('multer');
const os = require('os')

route.get('/', index);
route.get('/create', viewCreate);
route.post('/create', multer({dest: os.tmpdir()}).single('image'), actionCreate);
// single('image') 'image' harus sesuai dengan div attribute name pada form image
route.get('/edit/:id', viewEdit);
route.put('/edit/:id', multer({dest: os.tmpdir()}).single('image'), actionEdit);
route.delete('/delete/:id', actionDelete);
route.put('/status/:id', actionStatus);

module.exports = route;
