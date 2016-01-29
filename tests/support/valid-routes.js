

module.exports = {

    valid: {
        methods: [
            'get',
            ['get'],
            ['GET'],
            ['get', 'POST'],
            ['get', 'post', 'put'],
            'all',
            ['ALL']
        ]
    },
    invalid: {
        methods: [
            '',
            [],
            {},
            function () {},
            'invalid-get',
            ['invalid']
            ['GET', 'invalid']
        ]
    }

    test: [{
            //get empty path
            methods:     ['get'],
            path:       '',
            handlers:    [
                'SpotController.getAll'
            ]
        },{
            methods:     ['get'],
            path:       '/',
            handlers:    [
                'AuthController.authorizeToken',
                'SpotController.getAll'
            ]
        },{
            methods:     ['get'],
            path:       '/me',
            handlers:    [
                'AuthController.authorizeToken',
                'SpotController.getMe'
            ]
        },{
            methods:     ['get'],
            path:       '/:id',
            handlers:    [
                'AuthController.authorizeToken',
                'UserController.getById'
            ]
        },{
            method:     ['delete'],
            path:       '/:id',
            handlers:    [
                'AuthController.authorizeToken',
                'UserController.deleteUser'
            ]
        }]

};
