## Irving
Irving is a ReactJS based, isomorphically rendered, headless CMS frontend application. This is the core irving app package.

### Commands
* `irving build` - Build the app for a production environment.
* `irving start` - Start the built app.
* `irving dev` - Run the app in development with change watches and isomorphic hot module reloading.

### Setup
1. `npm install`

### Development
After running `irving dev`, navigate to `http://localhost:3001` in your browser.
Environment variable values can be modified by creating a `.env` file in the root of the project.

### Environment
* `APP_ROOT` - Absolute path to the directory in which this app will be executed.
This path will be included in the build and be used to resolve the location of your configuration file and express view templates.
By default, this variable will be set to `process.cwd()`. This variable is required if you are building your app in a
separate location from where it will be run.
* `BUILD_CONTEXT` - Absolute path used to indicate the context in which the build is occurring.
This will be provided as-is to webpack's `context` configuration property. By default,
this variable will be set to `process.cwd()`.
* `ROOT_URL` **required** - The root url the app is served from. This value is required to
prevent webpack assets from 404ing when the app isn't served from the root of a
site.
* `API_ROOT_URL` **required** - URL at which your components endpoint can be accessed.
* `API_ORIGIN` - Protocol and host at which your API is located. Usually the same as `API_ROOT_URL` but without a path. This is used only in a limited number of places (like passthrough proxies). This is not required if you are not using that functionality OR if your API origin and root URL are the same.
* `PORT` - http port the server will serve from
* `HOSTNAME` - FQDN of the server host
* `NODE_TLS_REJECT_UNAUTHORIZED` - Only disable this when attempting to execute
http requests to development APIs with self signed certificates. Never disable
this in production.
* `REDIS_URL` or `REDIS_MASTER` - url of redis instance using `redis://` protocol.
* `CACHE_DURATION` - time in seconds redis entries will persist before being
automatically deleted, defaults to 5 minutes
* `BASIC_AUTH_USERNAME`
* `BASIC_AUTH_PASSWORD`
* `DEBUG` - https://github.com/visionmedia/debug#environment-variables
* `NEW_RELIC_APP_NAME` - The name of this application, for reporting to New Relic's servers. This value can be also be a comma-delimited list of names.
* `NEW_RELIC_LICENSE_KEY` - Your New Relic license key.
* `PROXY_URL` - URL to proxy all server requests through.
* `HTTPS_KEY_PATH` - Path to tls key relative to current home directory.
* `HTTPS_CERT_PATH` - Path to tls cert relative to current home directory.
* `FETCH_TIMEOUT` - Timeout after which primary call to `fetch` to retrieve component data will be aborted.
* `IRVING_EXECUTION_CONTEXT` - Introduced automatically by the webpack build, this will be set to one of four possible values (or `undefined` outside of the build). This can be used to cut off execution pathways (and remove them from the build) in specific contexts. The values are:
  * `development_server` - Development build, server-side only
  * `production_server` - Production build, server-side only
  * `development_client` - Development build, client-side only
  * `production_client` - Production build, client-side only

#### Extra Query Params
Any environment variable that is prefixed with `API_QUERY_PARAM_`, for example
`API_QUERY_PARAM_MARKET=india`, will be mapped to a query param with the prefix
stripped out and the parameter name transformed to lowercase. This will allow
you to add extra query parameters to all components requests.

#### Debug Namespaces
- render
    - error
    - request
- server
    - error
- components
- sagas
    - location

### API Caching
Requests to the API host from the app running in Node can be cached with Redis.
If the `REDIS_URL` is set, and the `ioredis` package is installed, caching will
be enabled.

### Basic Authentication
When both fields are set the express app will automatically apply the
Authorization header for requests to the app. This will prompt the user to enter
the valid credentials to access the site.

### Application Monitoring
Transactions and errors can be logged to a monitoring service. Currently only
newrelic is supported. To enabled newrelic the `newrelic` package must be
installed, and the `NEW_RELIC_APP_NAME` and `NEW_RELIC_LICENSE_KEY` environment
variable must be set. See [here](https://github.com/newrelic/node-newrelic#configuring-the-module)
for additional newrelic configuration options.

### HTTPS
In production HTTPS will typically be handled by the load balancer of the
hosting environment. If you would like HTTPS for local development set the
`PROXY_URL`, `HTTP_KEY_PATH`, and `HTTPS_CERT_PATH` environment variables.
