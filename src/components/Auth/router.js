const { Router } = require('express');
const AuthComponent = require('../Auth');
const jwtConfig = require('../../config/middleware/jwtAuth');

/**
 * Express router to mount contact related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a new user
 * @name /auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/register', AuthComponent.signup);

/**
 * Route serving loging user
 * @name /auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', AuthComponent.login);

/**
 * Route serving get new tokens by refresh
 * @name /auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login-by-refresh', AuthComponent.getTokens);

/**
 * Route serving logout user
 * @name /auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/logout', jwtConfig.isAuthenticated, AuthComponent.logout);

module.exports = router;
