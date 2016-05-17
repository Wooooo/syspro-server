const
    chai        = require('chai'),
    expect      = chai.expect,
    appRoot     = require('app-root-path'),
    db          = require(`${appRoot}/models`),
    supertest   = require('supertest-as-promised');

chai.should();

const
    API_URL = '/api/data';

describe('#Data controller', () => {
    var agent;
    beforeEach(() => {
        agent = supertest.agent(require(`${appRoot}/index`));

        return db.sequelize.sync({force:true});
    });

    context('when valid data are given', () => {
        it('should save data and store them in database.', () => {
            return agent.post(API_URL)
                .send({
                    humidity: 500.0,
                    soil_humidity: 500.0,
                    temperature: 500.0,
                    illumination: 500.0
                })
                .expect(200);
        });
    })
});