const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`);

module.exports = (app) => {
    app.use('/users', router);
};


router.get('/:userId?',
    (req, res, next) => {
        var {userId} = req.params;
        var userIdRegExp = /^([0-9]+){1,10}$/;

        console.log(userId);

        if( !userId || typeof(userId) !== 'string' || userIdRegExp.test(userId) === false ) {
            res.status(400).end();
        }

        res.send("15 16 18 20 34");
    }
);