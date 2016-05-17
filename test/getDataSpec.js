const
    chai        = require('chai'),
    expect      = chai.expect,
    appRoot     = require('app-root-path'),
    db          = require(`${appRoot}/models`),
    Promise     = require('bluebird'),
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

    context('when valid date format is given', () => {
        beforeEach(() => {
            var promise = Promise.resolve(true);

            for(var i = 0 ; i < 5 ; i++) {
                promise = promise.then(() => {
                    return Promise.delay(3000)
                })
                .then(() => {
                    return agent.post(API_URL)
                        .send({
                            humidity: Math.random()*500,
                            soil_humidity: Math.random()*500,
                            temperature: Math.random()*500,
                            illumination: Math.random()*500
                        })
                        .expect(200);
                })
            }

            return promise;
        });

        it('should find data which is in the date and return them.', () => {
            return agent.get(API_URL)
                .query({date: '2016.05.17'})
                .expect(200)
                .then((res) => {
                    res.body.data.should.have.length(5);

                    console.log(res.body.data);
                });
        });
    });


});