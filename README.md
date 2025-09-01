# playground

A playground of databases, microservices and UI clients for trying new testing tools. This takes form as a fictional product order shop.

All of the below are able to run locally via docker.

## UI Applications

- A react based app that has a typical inventory display (display products, view products, display reviews, pagination, search etc)

## Microservices

- A microservice used by the UI application to retrieve products
- A microservice used by the UI application to accept, store and retrieve reviews for products

## Databases

- A postgres SQL database used to store products

## Testing

Given the above "landscape", it enables several types of testing to take place:

- UI

  - E2E UI tests (playwright)
  - Integration tests (mocking backend microservices)
  - Unit tests

- API
  - E2E API tests
  - Integration tests (database testing, schema validation, contract testing)
  - Unit tests

## Local Env

The UI app, microservices and database can be run locally via Docker. [scripts](./scripts) are also available for ease of setup.

Traefik is used as a reverse proxy so that all services can be accessed via localhost e.g:

```
https://localhost/products points to the products service
https://localhost:reviews points to the reviews service
etc
```

Ultimately this makes things a bit easier to find and access rather than memorising port numbers.
