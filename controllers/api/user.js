/**
 * @author Taewoo Kim
 * @brief controller about user config
 */
const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`);

module.exports = (app) => {
    app.use('/users', router);
};

/**
 * When user gives config update to server,
 * receive them and save into database
 */
router.post('/:userId',
    (req, res, next) => {
        var {userId} = req.param;

        var {data} = req.body;

        var illumination = data.split('_')[0],
            temperature = data.split('_')[1],
            humidity = data.split('_')[2],
            soil_humidity = data.split('_')[3];

        db.user.find({
            where: {
                id: userId
            }
        }).then((result) => {
            console.log(result);
            if( result == null ) {
                return db.user.create({
                    id: userId
                });
            }
            else {
                return result;
            }
        }).then((_res) => {
            return _res.update({
                illumination,
                temperature,
                humidity,
                soil_humidity
            })
        }).then(() => {
            res.status(200).end();
        })
    }
);

/**
 * When user require user config,
 * read them in database and give to them
 *
 * If never post user config, then it create user default info (10, 10, 10, 10)
 */
router.get('/:userId?',
    (req, res, next) => {
        var {userId} = req.params;
        var userIdRegExp = /^([0-9]+){1,10}$/;


        console.log(userId);
        if( !userId || (typeof(userId) !== 'number' && typeof(userId) !== 'string') || userIdRegExp.test(userId) === false ) {
            res.status(400).end();
        }

        else {
            db.user.find({
                where: {
                    id: userId
                }
            }).then((result) => {

                if( result == null ) {
                    return db.user.create({
                        id: userId
                    });
                }
                else {
                    return result;
                }
            }).then((_res) => {
                res.send(`${_res.illumination} ${_res.temperature} ${_res.humidity} ${_res.soil_humidity}`)
            });
        }

    }
);