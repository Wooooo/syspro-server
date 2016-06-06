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


router.get('/', (req, res, next) => {
    db.photo.findAll().then((photos) => {
        console.log(photos);

        res.render('photos', {
            photos: photos || [],
            title: 'Photos'
        });

    });
});