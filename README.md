# playground

A playground of databases, microservices and UI clients for trying new testing tools. This takes form as a fictional product order shop.

All of the below are able to run locally via docker.

## UI Applications

- A react based app that has a typical inventory display (display products, view products, pagination, search etc)

## Microservices

- A microservice used by the UI application to display products
- A microservice used by the UI application to receive and display reviews for products

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
