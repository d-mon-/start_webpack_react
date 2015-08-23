'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (controllers, dao) {
    router.get('/', controllers.index);

    return router;
};
