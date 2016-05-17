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
    var date = req.query.date.split('.').join('-')+' 00:00:00';
    var offset = (req.query.offset && req.query.offset*1) || 1;

    var startDate = new Date(date);
    var endDate = new Date(date);

    endDate.setDate(endDate.getDate()+offset);

    db.Data.findAll({
        where: {
            created_at: {
                $gte: startDate,
                $lte: endDate
            }
        },
        order: ['created_at']
    })
    .then((data) => {
        res.send({
            data: data
        });
    });
});