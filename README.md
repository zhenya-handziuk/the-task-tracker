# Install and start project

```
$ npm i
```
Steps to start a project:
```
1) create env file: ./bin/env-create.sh
2) create docker: make up
3) create database: psql -h postgres -U development
4) run migration: npm run migrate
5) run seed: npm run seed:all
6) run test: npm run test:run
```
