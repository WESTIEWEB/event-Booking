## Overview

This repo hold the code base for the Decagon Mananaged Internship project; Event Booking app.

## Requirements

Your local machine should have the following installed;

* NodeJS
* Typescript compiler
* Docker

## Backend Stack

* NodeJS
* Typescript
* NestJS
* Postgres
* Redis
* Mellisearch

## Local Development Setup

* Clone the repo
* Run `./dev-setup.sh`
* Run `npm install`
* Create a `.env` file in the project root and copy the contents of the `.env.sample` file to it, to setup your environment variables.
* Start the required services, run `npm run dev:start:infra`. This will start the required services you for development and to run tests; postgres, redis and mellisearch
* To stop the services, run `npm run dev:stop:infra`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Development

This application is developed following domain driven design practices [Read DDD Primer here](https://medium.com/microtica/the-concept-of-domain-driven-design-explained-3184c0fd7c3f) and the CQRS pattern and concepts [Learn more here](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs).
This allows us build an easily extendible system, that is not tightly coupled and not a pain to test.

### Code Structure

```
./src
├── app.module.ts
├── module
│   ├── module.ts
│   ├── providers.ts
│   ├── controllers
|   ├── domain
        ├── events
          ├── handlers
          ├── impl
|       ├── domain.ts
|   ├── commands
│       ├── handlers
|       ├── impl
|   ├── queries
│   ├── entities
|   ├── mappers
│   ├── dtos
│   ├── index.ts
│   ├── interfaces
│   ├── request-schemas
│   └── services
│   └── sagas.ts
├── core
├── database
│   ├── database.module.ts
│   ├── index.ts
│   ├── migrations
│   └── ormconfig.ts
.env.sample
.env.schema
```

The codebase is organized into logical self-contained modules, with every module defining its domains, events, sagas, commands, controllers, mappers, services, interfaces, dtos and controllers.

### Managing database migrations
To create a migration run;

```
npm run migration:create --name=${migrationName}
```

To execute migrations;

```
npm run migration:run
```

To revert a migtation run;

```
npm run migration:revert
```

### Running cli commands

To run custom cli commands

```
npm run cli <command-name>
```

### Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Conventions

* Always make sure your local `main` branch is up to date with the remote `main` branch, before starting a task on a new branch to minize conflicts and so that you have the latest changes.

* Keep your PRs as small as possible to allow for easy reviews.

* Files must be saved in kebab cases. For example the file for the class `CreatePasswordResetRequestHandler` should be saved as `create-password-reset-request.handler.ts`.

* Files must be suffixed with type name of the file before the the extension. For example a repositorie file for event listings, should be saved as `event-listing.repository.ts`.

* All files should be stored in directories with other related files .i.e. an persisted entity file should be saving the `entities` directory of its related module. E.G A `user.persisted-entity.ts` file should be saved at `src/user/entities/user.perisisted-entity.ts`

* Classes must use pascal case;
```
export class MyClassName {}
```