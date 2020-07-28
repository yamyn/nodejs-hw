const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/avatars' });
const UserComponent = require('../User');

/**
 * Express router to mount contact related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', UserComponent.findAll);

/**
 * Route serving a user
 * @name /users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', UserComponent.findById);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', UserComponent.create);

/**
 * Route serving a update users
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', UserComponent.updateById);

/**
 * Route serving a delete users
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', UserComponent.deleteById);

/**
 * Route serving a post avatar
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post(
    '/upload-avatar',
    upload.single('avatar'),
    UserComponent.uploadAvatar,
);

module.exports = router;
