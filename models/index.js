const
    fs          = require('fs'),
    path        = require('path'),
    Sequelize   = require('sequelize'),
    appRoot     = require('app-root-path'),
    config      = require(`${appRoot}/config`);

var db = {};
var sequelize = new Sequelize(process.env.JAWSDB_URL || process.env.TRAVIS_DB || config.db, {
    timezone: '+09:00'
});

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
