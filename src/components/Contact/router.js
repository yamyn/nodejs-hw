const { Router } = require('express');
const ContactComponent = require('../Contact');

/**
 * Express router to mount contact related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of contacts.
 * @name /contacts
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', ContactComponent.findAll);

/**
 * Route serving a contact
 * @name /contacts/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', ContactComponent.findById);

/**
 * Route serving a new contact
 * @name /contacts
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', ContactComponent.create);

/**
 * Route serving a update contacts
 * @name /contacts
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', ContactComponent.updateById);

/**
 * Route serving a delete contacts
 * @name /contacts
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', ContactComponent.deleteById);

module.exports = router;
