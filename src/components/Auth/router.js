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
 * @name /auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/register', AuthComponent.signup);

/**
 * Route serving loging user
 * @name /auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', AuthComponent.login);

/**
 * Route serving get new tokens by refresh
 * @name /auth/login-by-refresh
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login-by-refresh', AuthComponent.getTokens);

/**
 * Route serving logout user
 * @name /auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/logout', jwtConfig.isAuthenticated, AuthComponent.logout);


/**
 * Route serving logout user
 * @name /auth/verify
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/verify/:verificationToken', AuthComponent.verifyEmail);

module.exports = router;
