const
    express             = require('express'),
    glob                = require('glob'),
    favicon             = require('serve-favicon'),
    logger              = require('morgan'),
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser'),
    compress            = require('compression'),
    methodOverride      = require('method-override'),
    session             = require('express-session'),
    appRoot             = require('app-root-path'),
    db                  = require(`${appRoot}/models`),
    path                = require('path');


module.exports = function (app, config) {
    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.set('views', appRoot + '/views');
    app.set('view engine', 'ejs');

    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());
    app.use(compress());
    app.use('/assets', express.static(config.root + '/assets'));
    app.use('/photos', express.static(path.join(appRoot.path, 'photos')));
    app.use(methodOverride());

    /** config for passport
     * Later, it can be moved
     */


    var controllers = glob.sync(path.join(appRoot.path, 'controllers/*'));
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

};
