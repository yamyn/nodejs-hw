const express = require('express');
const http = require('http');
const jwtConfig = require('./middleware/jwtAuth');
const ContactRouter = require('../components/Contact/router');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /auth URI to AuthRouter.
         * @name /auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/api/auth', AuthRouter);

        /**
         * Forwards any requests to the /contacts URI to ContactRouter.
         * @name /contacts
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/api/contacts', jwtConfig.isAuthenticated, ContactRouter);

        /**
         * Forwards any requests to the /users URI to UserRouter.
         * @name /users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/api/users', jwtConfig.isAuthenticated, UserRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
