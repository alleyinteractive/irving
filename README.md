## Irving
Irving is a ReactJS based, isomorphically rendered, headless CMS frontend application.

### Commands
* `npm run build` - Build the app for a production environment.
* `npm run start` - Start the built app.
* `npm run dev` - Run the app in development with change watches and isomorphic hot module reloading.
* `npm run test` - Run test suite.
* `npm run test:watch` - Rerun test suit when files change.

### Setup
1. `npm install`

### Development
After running `npm run dev`, navigate to `http://localhost:3001` in your browser.
Environment variable values can be modified by creating a `.env` file in the root of the project.

### HTTPS
In production HTTPS will typically be handled by the load balancer of the
hosting environment. If you would like HTTPS for local development set the
`PROXY_URL`, `HTTP_KEY_PATH`, and `HTTPS_CERT_PATH` environment variables.
