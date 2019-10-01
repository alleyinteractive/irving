## Irving
Irving is the top-level irving monorepo. If you're reading this, you're probably confused or want to contribute to irving (hopefully the latter!)

### Commands
* `npm run build` - No build exists currently.
* `npm run styleguide:build` - Build the styleguide for irving core and all its packages.
* `npm run styleguide:dev` - Serve the styleguide and watch for changes.
* `npm run test` - Run all tests in all packages once.
* `npm run test:watch` - Rerun tests when files change.

### Setup
1. `npm install` - Install and hoist packages for the monorepo via lerna.

### Contributing
We currently do not have a canonical testing application nor guidelines for contributing, but they are on our immediate roadmap.

### Development
After running `npm run dev`, navigate to `http://localhost:3001` in your browser.
Environment variable values can be modified by creating a `.env` file in the root of the project.

### HTTPS
In production HTTPS will typically be handled by the load balancer of the
hosting environment. If you would like HTTPS for local development set the
`PROXY_URL`, `HTTP_KEY_PATH`, and `HTTPS_CERT_PATH` environment variables.
