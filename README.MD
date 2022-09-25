

## Setup

- Ensure you have your docker daemon running
- These instructions will assume you have `yarn` as your package manager

### Commands

- In root of project run `yarn` to install api and client deps
- When finished run `docker-compose up --build` to spin up a local DB
- `yarn start:client` to run the front end application
- `yarn start:api` to run the backend applicaiton