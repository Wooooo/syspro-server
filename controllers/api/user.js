const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`);

module.exports = (app) => {
    app.use('/users', router);
};


router.get('/:userId',
    (req, res, next) => {
        console.log(req.params.userId);
        res.send("15 16 18 20 34");
    }
);