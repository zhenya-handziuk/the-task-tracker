const faker = require('faker');
const factory = require('../../../factories');
const { hashPassword } = require('../../../../src/libs/Helper');

const ApiApp = require('../../../../src/server');
const request = require('supertest').agent(ApiApp, {});

module.exports = async function() {
    let authData = {};

    try {
        const app = {
            async authorize(args = {}) {
                const password = args.password || faker.internet.password();

                this.user = await factory.create('user', {
                    email: args.email || 'default@mail.com',
                    password: hashPassword(password),
                });

                const res = await this.post('/api/v2/users/login', {
                    email: this.user.email,
                    password: password
                });

                this.token = `Bearer ${res.body.token}`;

                authData = res.body;

                return this;
            },

            get(url, query = {}, headers = {}) {
                if (Object.keys(headers).length === 0) {
                    headers.authorization = this.token;
                } else {
                    headers;
                }

                return makeRequest({
                    method: 'get',
                    url, query, headers
                });
            },

            post(url, data = {}, headers = {}) {
                return makeRequest({
                    method: 'post',
                    url, data, headers
                });
            },

            put(url, data, headers = {}) {
                if (Object.keys(headers).length === 0) {
                    headers.authorization = this.token;
                } else {
                    headers;
                }

                return makeRequest({
                    method: 'put',
                    url, data, headers
                });
            },

            delete(url, data, headers = {}) {
                if (Object.keys(headers).length === 0) {
                    headers.authorization = this.token;
                } else {
                    headers;
                }

                return makeRequest({
                    method: 'delete',
                    url, data, headers
                });
            }
        };

        async function makeRequest({ method, url, query, data, headers = {} }) {
            const req = request[method](url);

            if (query) {
                req.query(query);
            }

            if (headers) {
                Object.keys(headers).forEach(key => req.set(key, headers[key]));
            }

            return await req.send(data).then(res => res);
        }

        return app;

    } catch (e) {
        if (e) console.log(e);
    }
};
