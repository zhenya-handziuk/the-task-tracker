up:
	docker-compose up --build -d
log:
	docker-compose up --build
down:
	docker-compose down
exec:
	docker-compose exec api /bin/bash
test:
	docker-compose run --rm api npm run test
