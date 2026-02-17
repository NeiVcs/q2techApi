DOCKER_CLI=docker compose -f docker-compose.cli.yml run --rm
NETWORK_NAME = net_api_piu

create-network:
	@if [ -z "$$(docker network ls --filter name=^$(NETWORK_NAME)$$ --format '{{.Name}}')" ]; then \
		echo "Creating the network $(NETWORK_NAME)..."; \
		docker network create $(NETWORK_NAME); \
	else \
		echo "The network $(NETWORK_NAME) already exists."; \
	fi

build: create-network
	docker compose build
	$(DOCKER_CLI) yarn install

install:
	$(DOCKER_CLI) yarn install

dev:
	docker compose up q2tech

hmg:
	ENV_FILE=.env_hmg docker compose up q2tech

prod:
	ENV_FILE=.env_prod docker compose up q2tech

test:
	$(DOCKER_CLI) yarn test

checklist:
	$(DOCKER_CLI) yarn lint:pkg
	$(DOCKER_CLI) yarn lint:fix
	$(DOCKER_CLI) yarn format:fix
	rm -rf app/dist
	$(DOCKER_CLI) yarn build


migrate-run-hmg:
	ENV_FILE=.env_hmg $(DOCKER_CLI) knex migrate:latest

migrate-rollback-hmg:
	ENV_FILE=.env_hmg $(DOCKER_CLI) knex migrate:rollback

migrate-run-prod:
	ENV_FILE=.env_prod $(DOCKER_CLI) knex migrate:latest

migrate-rollback-prod:
	ENV_FILE=.env_prod $(DOCKER_CLI) knex migrate:rollback