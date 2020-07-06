const chai = require('chai');
chai.use(require('chai-subset'));
const expect = chai.expect;
const factory = require('../../factories');
const { hashPassword } = require('../../../src/libs/Helper');

const { truncate } = require('../../support/db-cleaner');
const initApp = require('../controller/support');

describe('Users', function() {
    before(async function() {
        await truncate();

        this.app = await initApp();

        await this.app.authorize();

        this.user = await factory.create('user', {
            email: 'email@gmail.com',
            password: hashPassword('test')
        });
    });

    describe('#list', function() {
        before(async function() {
            this.users = await factory.createMany('user', 3, [{}]);
        });

        it('should return status success', async function() {
            const res = await this.app.get('/api/v2/users');

            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(5);
        });
    })

    describe('#registration', function() {
        it('should create new user', async function() {
            const res = await this.app.post('/api/v2/users/registration', {
                firstName: 'John',
                lastName: 'Dou',
                email: 'dou@gmail.com',
                password: '11111',
                rePassword: '11111'
            });

            expect(res.body).to.have.property('firstName').eq('John');
        });

        it('When the password does not match the repeated', async function() {
            const res = await this.app.post('/api/v2/users/registration', {
                firstName: 'John',
                lastName: 'Dou',
                email: 'dou@gmail.com',
                password: '11111',
                rePassword: '99999'
            })

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });

        it('When user exist', async function() {
            const res = await this.app.post('/api/v2/users/registration', {
                firstName: 'John',
                lastName: 'Dou',
                email: this.user.email,
                password: '11111',
                rePassword: '11111'
            })

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });
    });

    describe('#login', function() {
        before(async function() {
            // this.user = await factory.create('user', {
            //     password: hashPassword('test')
            // });
        })

        it('Should logging in system', async function() {
            const res = await this.app.post('/api/v2/users/login', {
                email: this.user.email,
                password: 'test'
            });

            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('id').eq(this.user.id);
            expect(res.body).to.have.property('token').to.be.not.null;
        });

        it('When email or password dont sent', async function() {
            const res = await this.app.post('/api/v2/users/login', {
                email: this.user.email,
                password: ''
            });

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });

        it('When user not found', async function() {
            const res = await this.app.post('/api/v2/users/login', {
                email: 'notfound@gmail.com',
                password: 'test'
            });

            expect(res.body).to.have.property('code').eq(404)
            expect(res.body).to.have.property('message').eq('NotFound');
        });
    });

    describe('#editUserData', function() {
        it('Should update user data', async function() {
            const newEmail = 'newEmail@gmail.com'
            const res = await this.app.put(`/api/v2/users/${this.user.id}`, {
               email: newEmail
            });

            expect(res.body).to.have.property('id').eq(this.user.id);
            expect(res.body).to.have.property('email').eq(newEmail);
        });

        it('When user not found', async function() {
            const res = await this.app.put(`/api/v2/users/99999999`, {
               email: 'newEmail@gmail.com'
            });

            expect(res.body).to.have.property('code').eq(404)
            expect(res.body).to.have.property('message').eq('NotFound');
        });

        it('When the password does not match the repeated', async function() {
            const res = await this.app.put(`/api/v2/users/${this.user.id}`, {
                password: '11111',
                rePassword: '99999'
            })

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });
    })

    describe('#getUserData', function() {
        it('Should return user', async function() {
            const res = await this.app.get(`/api/v2/users/${this.user.id}`);

            expect(res.body).to.have.property('id').eq(this.user.id);
        });
    });


    describe('#destroy', function() {
        it('Should delete user bu id', async function() {
            const res = await this.app.delete(`/api/v2/users/${this.user.id}`);

            expect(res.body).to.have.property('status').eq('success');
        });
    })
})
