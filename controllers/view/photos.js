/**
 * @author Taewoo Kim
 * @brief View for photos
 */
const
    express     = require('express'),
    router      = express.Router(),
    appRoot     = require('app-root-path'),
    path        = require('path'),
    db          = require(`${appRoot}/models`),
    multer      = require('multer');

var upload = multer({dest: path.join(appRoot.path, 'photos')});

module.exports = (app) => {
    app.use('/photos', router);
};

/**
 * When user wants photos view with userId,
 *
 */
router.get('/:userId', (req, res, next) => {
    console.log(req.params);
    var {userId} = req.params;

    db.photo.findAll({
        where: {
            userId: userId
        }
    }).then((photos) => {
        console.log(photos);
        res.render('photos', {
            photos: photos || [],
            title: 'Photos'
        });

    });
});