const express = require('express');

const index = express.Router();

index.get('/', function(req, res) {
    res.render('./index/index');
});

module.exports = index;