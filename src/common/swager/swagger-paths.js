const swaggerHelpers = require('./swagger-helpers');

const securityObject = [
    {
        authenticate: [],
    },
];

module.exports = {
    '/': {
        get: {
            tags: ['Open'],
            description:
                "Get root request's response from the api - basically server status",
            responses: {
                301: {
                    description: 'Redirect to Open Api',
                },
            },
        },
    },
    /** ============ Auth ============ */
    '/api/auth/register': {
        post: {
            tags: ['Auth'],
            summary: 'User authentication',
            description: 'User authentication',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: ' User signup',
                    description: 'User authentication',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'gender',
                            'subscription',
                        ],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'mango@gmail.com',
                            },
                            password: { type: 'string', example: 'pass123' },
                            gender: {
                                type: 'string',
                                enum: ['male', 'female'],
                                example: 'male',
                            },
                            subscription: {
                                type: 'string',
                                enum: ['free', 'pro', 'premium'],
                                example: 'free',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
        },
    },
    '/api/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'User login ',
            description: 'Login to the service',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'User signin ',
                    description: 'User Signin ',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string', example: 'email' },
                            password: { type: 'string', example: 'pass123' },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
        },
    },

    '/api/auth/login-by-refresh': {
        post: {
            tags: ['Auth'],
            summary: 'get Tokens by Refresh',
            description: 'Update tokens pair by refresh Token',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'get Tokens ',
                    description: 'Update tokens pair by refresh Token ',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: {
                                type: 'string',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWZkZmQ2N2ZmOWU1OWYyOGNhMGU2NCIsImlhdCI6MTU5NjAwNDg1OCwiZXhwIjoxNTk2MDA4NDU4fQ.jP9dCDrTsKOdVWl-01TPcsD4kQgN5fqsSO9LsECKnW0',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
        },
    },

    '/api/auth/logout': {
        post: {
            tags: ['Auth'],
            summary: 'Logout ',
            description: 'Logout from application',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Logout ',
                    description: 'Logout from application ',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['accessToken'],
                        properties: {
                            accessToken: {
                                type: 'string',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWZkZmQ2N2ZmOWU1OWYyOGNhMGU2NCIsImlhdCI6MTU5NjAwNDg1OCwiZXhwIjoxNjAzNzgwODU4fQ.AGRtgGxg-FpKNdF-nVsPzUNkuzN4ivTAC54d33S0HwY',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },

    /** ============ User Details ============ */
    '/api/users': {
        get: {
            tags: ['Users'],
            summary: 'Get all users',
            description:
                'Get all users (in feature this route will has only admin role)',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        post: {
            tags: ['Users'],
            summary: 'Create User ',
            description:
                'Create new user (in feature this route will has only admin role)',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Create User ',
                    description: 'Create User ',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'gender',
                            'subscription',
                        ],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'mango@gmail.com',
                            },
                            password: { type: 'string', example: 'pass123' },
                            gender: {
                                type: 'string',
                                enum: ['male', 'female'],
                                example: 'male',
                            },
                            subscription: {
                                type: 'string',
                                enum: ['free', 'pro', 'premium'],
                                example: 'free',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        put: {
            tags: ['Users'],
            summary: 'Update user Details',
            description: 'Update user Detailss',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'userData',
                    description: 'Update user Details',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['id'],
                        properties: {
                            id: {
                                type: 'string',
                                example: '5f1fdfd67ff9e59f28ca0e64',
                            },
                            password: {
                                type: 'string',
                                example: 'qwerty12345',
                            },
                            gender: {
                                type: 'string',
                                enum: ['male', 'female'],
                                example: 'male',
                            },
                            subscription: {
                                type: 'string',
                                enum: ['free', 'pro', 'premium'],
                                example: 'free',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        delete: {
            tags: ['Users'],
            summary: 'Delete User',
            description: 'Delete user`s account',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Delete User',
                    description: 'Delete user`s account',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['id'],
                        properties: {
                            id: {
                                type: 'string',
                                example: '5f1fdfd67ff9e59f28ca0e64',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },
    '/api/users/:id': {
        get: {
            tags: ['Users'],
            summary: 'Get user',
            description: 'Get user by id',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'params',
                    name: 'id',
                    schema: {
                        type: 'string',
                        example: '5f1fdfd67ff9e59f28ca0e64',
                    },
                    required: true,
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },

    '/api/users/upload-avatar': {
        post: {
            tags: ['Users'],
            summary: 'Upload Avatar ',
            description: 'Upload profile`s Avatar',
            consumes: ['multipart/form-data'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'formData',
                    name: 'avatar',
                    type: 'file',
                    required: true,
                    description: 'Upload profilePic.',
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },

    /** ============ Contact Details ============ */
    '/api/contacts': {
        get: {
            tags: ['Contacts'],
            summary: 'Get contacts',
            description: 'Get all user`s contacts',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    schema: { type: 'number', example: 1 },
                    required: false,
                },
                {
                    in: 'query',
                    name: 'limit',
                    schema: { type: 'number', example: 10 },
                    required: false,
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        post: {
            tags: ['Contacts'],
            summary: 'Create contact ',
            description: 'Create new contact ',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Create Contact ',
                    description: 'Create Contact ',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['email', 'name', 'phone'],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'polly@gmail.com',
                            },
                            name: { type: 'string', example: 'Polly' },
                            phone: {
                                type: 'string',
                                example: '0687707599',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        put: {
            tags: ['Contacts'],
            summary: 'Update contat',
            description: 'Update contats`s Details',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'contactData',
                    description: 'Update contats`s Details',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['id'],
                        properties: {
                            id: {
                                type: 'string',
                                example: '5f1fdfd67ff9e59f28ca0e64',
                            },
                            email: {
                                type: 'string',
                                example: 'polly@gmail.com',
                            },
                            name: { type: 'string', example: 'Polly' },
                            phone: {
                                type: 'string',
                                example: '0687707599',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
        delete: {
            tags: ['Contacts'],
            summary: 'Delete Contact',
            description: 'Delete user`s contact',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Delete Contact',
                    description: 'Delete user`s contact',
                    required: true,
                    schema: {
                        type: 'object',
                        required: ['id'],
                        properties: {
                            id: {
                                type: 'string',
                                example: '5f1fdfd67ff9e59f28ca0e64',
                            },
                        },
                    },
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },
    '/api/contacts/:id': {
        get: {
            tags: ['Contacts'],
            summary: 'Get contact',
            description: 'Get contact by id',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'params',
                    name: 'id',
                    schema: {
                        type: 'string',
                        example: '5f1fdfd67ff9e59f28ca0e64',
                    },
                    required: true,
                },
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
        },
    },
};
