const chai = require('chai');
chai.use(require('chai-subset'));
const expect = chai.expect;
const factory = require('../../factories');

const { truncate } = require('../../support/db-cleaner');
const initApp = require('../controller/support');

describe('Tasks', function() {
    before(async function() {
        await truncate();

        this.app = await initApp();

        this.user = await this.app.authorize();

        this.task = await factory.create('task');
    });

    describe('#createTask', function() {
        it('Should create new Task', async function() {
            const res = await this.app.post('/api/v2/tasks', {
                title: 'title',
                description: 'des'
            }, {
                authorization: this.user.token
            });

            expect(res.body).to.have.property('userId').eq(this.user.user.id);
        });

        it('When status not equal view, in progress and done', async function() {
            const res = await this.app.post('/api/v2/tasks', {
                status: 'Wrong'
            }, {
                authorization: this.user.token
            });

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });
    });

    describe('#editTask', function() {
        beforeEach(async function() {
            this.newUser = await factory.create('user');
        });

        it('Should update task', async function() {
            const newStatus = 'Done';
            const res = await this.app.put(`/api/v2/tasks/${this.task.id}`, {
                status: newStatus,
                userId: this.newUser.id
            })

            expect(res.body).to.have.property('status').eq(newStatus);
            expect(res.body).to.have.property('userId').eq(this.newUser.id);
        });

        it('When status not equal view, in progress and done', async function() {
            const res = await this.app.put(`/api/v2/tasks/${this.task.id}`, {
                status: 'Wrong'
            });

            expect(res.body).to.have.property('code').eq(400)
            expect(res.body).to.have.property('message').eq('BadRequest');
        });

        it('When user not found', async function() {
            const res = await this.app.put(`/api/v2/tasks/${this.task.id}`, {
                userId: 999999
            });

            expect(res.body).to.have.property('code').eq(404)
            expect(res.body).to.have.property('message').eq('NotFound');
        });

        it('When task not found', async function() {
            const res = await this.app.put(`/api/v2/tasks/999999`, {
                status: 'Done'
            });

            expect(res.body).to.have.property('code').eq(404)
            expect(res.body).to.have.property('message').eq('NotFound');
        });
    })

    describe('#delete', function() {
        it('Should delete task by id', async function() {
            const res = await this.app.delete(`/api/v2/tasks/${this.task.id}`);

            expect(res.body).to.have.property('status').eq('success');
        });
    })

    describe('#list', function() {
        beforeEach(async function() {
            this.users = await factory.createMany('user', 2, [{}]);

            this.tasks = await factory.createMany('task', 3, [{
                status: 'Done',
                userId: this.users[0].id
            }, {
                userId: this.users[1].id
            }, {
                userId: this.users[0].id
            }])
        });

        it('Should return list of task with filter by status done', async function() {
            const res = await this.app.get('/api/v2/tasks?filters=[{"status":"Done"}]')

            expect(res.body).to.be.an('array').lengthOf(1);
        });
    });
})
