/**
 * @file data.js
 * @author Taewoo Kim
 * @brief controller that handle data about plant
 */
const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`),
    Twitter     = require('twitter');

module.exports = (app) => {
    app.use('/data', router);
};

/**
 * When user send data about plant to /api/data,
 * receive them and save into database
 */
router.post('/', (req, res, next) => {

    db.data.create(req.body)
        .then((datum) => {
            res.status(200).end();

        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

/**
 * When user require data about their plant,
 * read them from database and send them
 */
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
    db.data.findAll({
        where: findOption,
        order: ['created_at']
    })
    .then((data) => {
        res.send({
            data: data
        });
    });
});