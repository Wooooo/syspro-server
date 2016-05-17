var path = require('path'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        db: 'mysql://localhost/server-development'
    },

    test: {
        db: 'mysql://root:1234@localhost/syspro'
    },

    production: {
        db: 'mysql://localhost/server-production'
    }
};

module.exports = config[env];
