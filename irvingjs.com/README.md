# tech-worker-landing-page

A static site generator setup to facilitate creating Lede landing pages.

## Usage

Install dependencies and start the build.

```shell
npm install
npm start
```

The `start` script will open the page with BrowserSync and refresh when changes are detected.

To build the production-ready pages, run `npm run build`.

To test the build and verify production values prior to deploy, run `npm test`. This will re-build the site and serve the built files.

## Docs

See README in project directories for more information about the configuration.

See [11ty.dev](https://www.11ty.dev/) for 11ty-specific documentation.

## Environments

`production` is automatically deployed (in [DeployBot](https://alleyinteractive.deploybot.com/153068--LEDE-tech-worker-landing-page/environments/)) via Alley's AWS account user `deploybot-tech-worker`. This user is authorized to make changes to the tech-worker-landing-page S3 bucket and create cloudfront invalidations for the [distribution](https://console.aws.amazon.com/cloudfront/home?region=us-east-1#distribution-settings:E30Z445FYZH29U).

Until we have a domain available, the site is only visible direcly from https://d2nnyb7cumqlex.cloudfront.net/
