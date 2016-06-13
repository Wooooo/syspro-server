const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`),
    Twitter     = require('twitter');

module.exports = (app) => {
    app.use('/sns', router);
};

var client = new Twitter({
    consumer_key: 'Efo6fg7p21z3O6nq9Nka79V0r',
    consumer_secret: 'P7B4GtnvKnlQGQwRO48HlwC4VBmXPJ1linsQSHgYtaW0B8ahN8',
    access_token_key: '740024569679872000-oplh2WJchx3Rxw1vXarEDr761YbIPeQ',
    access_token_secret: 'DQCGEsaAUSk8GLS0qx4q9jrUrG79Wwc7aFpTTeGf8DolI'
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    var {message} = req.body;

    client.post('statuses/update', {status: `Data upload! ${message}`},  function(error, tweet, response){
        if(error) {
            console.log(error);
            throw error;
        }
        console.log(tweet);  // Tweet body.
        console.log(response);  // Raw response object.


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