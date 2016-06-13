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


router.post('/:userId', upload.single('sendfile'),
    (req, res, next) => {
        console.log(req.file);
        var {filename, mimetype, size} = req.file;
        var {userId} = req.params;

        db.photo.create({
            filename, mimetype, size, userId
        }).then((file) => {
            console.log(file);
            res.end();
        }).catch((err) => {
            console.log(err);
        })

    }
);

router.get('/', (req, res, next) => {
});