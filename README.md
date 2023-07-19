
## Description

Project Integration API https://developer.themoviedb.org/ with project Nest framework and Mongo. synchronization movies of tmdb to mongo database

**Modules**

-Auth

-Integration tmdb 

-Movies


**Test Unit**

-Jest



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Serverless

Install AWS cli and configure your credentials in your pc

Open the file serverless.yaml and configure in the key "region" your region AWS

region: {my-region}


Install Serverless npm package global
    
```bash
npm install -g serverless  
```

Deploy Project in the Serverless

```bash
sls deploy --verbose
```


## Deploy Aws Lambda
https://5xzt219zte.execute-api.us-east-1.amazonaws.com/


## Documentation Swagger

https://5xzt219zte.execute-api.us-east-1.amazonaws.com/production/docs

## License

Nest is [MIT licensed](LICENSE).







