const express = require('express');
require('dotenv').config();

const middleware = require('../config/./middleware/middleware');
const routes = require('../config/router');

/**
 * @type {express}
 * @constant {express.Application}
 */
const app = express();

/**
 * @description express.Application Middleware
 */
middleware.init(app);

/**
 * @description express.Application Routes
 */
routes.init(app);

/**
 * @description sets port 3030 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3030);

module.exports = app;
