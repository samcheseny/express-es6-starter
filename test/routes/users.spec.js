const UsersController = require('../../main/controllers/users-controller');

describe('Testing Users Routes', () => {

    beforeEach('Do something before each test', () => {

    });

    it('should list all active users', (done) => {

        chai.request(server)
            .get('/api/users')
            .end((error, response) => {
                response.should.have.status(200);
                response.should.be.json;
                done();
            })

    });

    it('should add a new user', () => {

    });

    afterEach('Do something after each test', () => {

    });
});
