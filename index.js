const
    express     = require('express'),
    config      = require('./config'),
    path        = require('path'),
    Promise = require('bluebird'),
    db = require('./models');

var app = express();

require('./express')(app, config);

var port = process.env.PORT || 3000;
//
//if(process.env.NODE_ENV === 'test') {
//    console.log('Livereload starts.');
//    livereload = require('livereload');
//    server = livereload.createServer();
//    server.config.exts.push("ejs");
//
//    server.watch([path.join(__dirname + '/app/views')]);
//}

if(!module.parent) {
    db.sequelize
        .sync({force:true})
        .then(function() {

            var vals = [];
            for(var i = 0 ; i < 24 ; i++) vals[i] = i;

            return Promise.all(vals.map((a, index) => {
                var date = new Date('2016-05-17');

                date.setHours(index);

                var _data = {
                    humidity: Math.random()*500,
                    soil_humidity: Math.random()*500,
                    temperature: Math.random()*500,
                    illumination: Math.random()*500
                };

                return db.Data.create(_data).then((data) => {
                    data.created_at = date;

                    return data.save();
                })
                .then(() => {
                    date.setHours(date.getHours()+1);
                });
            }));

        })
        .then(function () {
            app.listen(port, function () {
                console.log('Express server listening on port ' + port);
            });
        }).catch(function (e) {
        throw new Error(e);
    });
}

module.exports = app;