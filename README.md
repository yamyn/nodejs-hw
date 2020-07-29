# nodejs-hw

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Requirements

-   node >= 12
-   npm >= 6

## Installation

### Install Dependencies

```bash
npm install

```

### Environment

You need to create and populate the .env file according to sample.env

### Up db migrations

Make all migrations to current db architecture:

```bash
npm run migrate:up

```

### Start app

For development:

```bash
npm run dev

```

For production:

```bash
npm start

```

## This App have Open-api documentation

```
http://localhost:3030/api/explore

```
