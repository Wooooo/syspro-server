/**
 * @file index.js
 * @author Taewoo Kim
 * @brief Init other controllers
 */
const
    glob        = require('glob'),
    path        = require('path'),
    express     = require('express'),
    router = express.Router();

var controllers = glob.sync( path.join(__dirname, '*.js') );

/**
 * @
 * @param app
 */
module.exports = (app)=>{
    app.use('/api', router);

    controllers.forEach(function (controller) {
        if( path.basename(controller) === 'index.js' ) return;

        require(controller)(router);
    });
};