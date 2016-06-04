const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`);

module.exports = (app) => {
    app.use('/data', router);
};


router.post('/', (req, res, next) => {
    console.log(req.body);

    db.Data.create(req.body)
        .then((datum) => {
            res.status(200).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

router.get('/', (req, res, next) => {
    var date;
    if( req.query.date ) {
        date = req.query.date.split('.').join('-')+' 00:00:00';
    }

    var findOption = {};

    if( date ) {
        var startDate = new Date(date);
        var endDate = new Date(date);

        var offset = (req.query.offset && req.query.offset*1) || 1;

        endDate.setDate(endDate.getDate()+offset);

        findOption['created_at'] = {
            $gte: startDate,
            $lte: endDate
        }
    };

    db.Data.findAll({
        where: findOption,
        order: ['created_at']
    })
    .then((data) => {
        res.send({
            data: data
        });
    });
});