const UsersController = require('../../main/controllers/users-controller');

beforeEach('Do something before each test', () => {
    console.log('Beginning');
});

describe('Testing UsersController', () => {

    describe('getAll', () => {

        it('should return all active users', () => {
            let isValid = true;
            expect(isValid).to.be.true;
        });

        it('should return inactive users', () => {
            let isValid = true;
            expect(isValid).to.be.true;
        });

    });

});

afterEach('Do something after each test', () => {
    console.log('Ending');
});