# Irving
Irving is a ReactJS based, isomorphically rendered, headless CMS frontend application.

## Commands
* `npm run build` - Build the app for a production environment.
* `npm run start` - Start the built app.
* `npm run dev` - Run the app in development with change watches and isomorphic hot module reloading.
* `npm run test` - Run test suite.
* `npm run test:watch` - Rerun test suit when files change.

## Setup
1. `npm install`

## Development
After running `npm run dev`, navigate to `http://localhost:3001` in your browser.
Environment variable values can be modified by creating a `.env` file in the root of the project.

## Environment
* `ROOT_URL` - The root url the app is served from. This value is required to
prevent webpack assets from 404ing when the app isn't served from the root of a
site.
* `PORT` - http port the server will serve from
* `HOSTNAME` - FQDN of the server host
* `NODE_TLS_REJECT_UNAUTHORIZED` - Only disable this when attempting to execute
http requests to development APIs with self signed certificates. Never disable
this in production.
* `REDIS_URL` - url of redis instance using `redis://` protocol.
* `CACHE_DURATION` - time in seconds redis entries will persist before being
automatically deleted, defaults to 5 minutes
* `BASIC_AUTH_USERNAME`
* `BASIC_AUTH_PASSWORD`

## API Caching
Requests to the API host from the app running in Node can be cached with Redis.
If the `REDIS_URL` is set caching will be enabled.

## Basic Authentication
When both fields are set the express app will automatically apply the
Authorization header for requests to the app. This will prompt the user to enter
the valid credentials to access the site.
