# Welcome to Heathers News

A hosted version of this API can be found on https://heathers-news.herokuapp.com/api

## What is Heathers News?

My first javaScript project is an API to view news articles. It connects to a PSQL database using node-postgres. The API allows the user to access a list of news topics, users, comments. The articles can filtered and/or sorted at the request of the user. 
An overview of the functionality of the API can viewed using the /api endpoint.

## Running Heathers-News locally: 

Firstly the repo will need to be forked and cloned to a local device. 

You will need to create two .env files `.env.test` and `.env.development`.

- Into `.env.test`, add `PGDATABASE=nc_news_test`

- Into `.env.development`, add `PGDATABASE=nc_news`

The following dependencies need to be installed before use and can be done by inputting the following lines into the terminal. 

`NPM`
- npm init -y

`Express`
- npm install express

`Node-postgres`
- npm install pg

Before testing the databases need to be initialised using the following scripts:
- npm setup-dbs
- npm seed

Running tests can be done using:

-npm test app.test.js





