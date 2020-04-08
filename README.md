# MIT Technology Review — Irving

This is the front-end application for tecnologyreview.com's headless WordPress instance. For more detailed information, [view the README in the WordPress repository](https://github.com/alleyinteractive/mittr-wp/blob/master/README.md).

## Branch workflow

1. Branch off of `origin/master`, prefixing feature with the ticket number (let's call the new branch `feature/MIT-123/feature-name-description`).
1. Make all commits for the new feature into `feature/MIT-123/feature-name-description`.
1. You can merge freely into `wpcomvip/develop` and push at will for testing. Merges to `wpcomvip/develop` deploy [here](https://irving-develop.technologyreview.com/)
1. Make a pull request for `feature/MIT-123/feature-name-description` into `origin/master` and code review by Alley members. Do not merge changes yet.
1. Make pull request into `wpcomvip/master` simultaneously. There is no VIP code review on the node repository.
1. Once the feature has passed internal code review and has been tested by the feature author on the staging environment (develop branch), merge the code to the preprod branch [here](https://irving-preprod.technologyreview.com/) and perform internal QA and external UAT on this environment. Only proceed to the next step once these test have passed.
1. Merge the pull requests into `origin/master` and `wpcomvip/master`. These should be merged as close to the same time as possible so not to get out of sync with each other.

## Environmental variables

Your Irving application may include the following environmental variables in a local `.env` file:

### ROOT_URL

The URL from which the application is served. For local development, use http://localhost:3001. If you are using Caddy for Zephr development (see below) choose https://localhost.

### API_ROOT_URL

The corresponding Irving endpoint in your CMS. For Alley developers working locally, this is `https://mittr.alley.test/wp-json/irving/v1`.

### NODE_TLS_REJECT_UNAUTHORIZED

For local development, `0`.

### DEBUG=render:*,server:*,components,sagas:*

For local development.

### HTTPS_KEY_PATH

For Alley developers working locally, this is `broadway/config/nginx-config/certs/server.key`.

### HTTPS_CERT_PATH

For Alley developer working locally, this is `broadway/config/nginx-config/certs/server.crt`.

### ZEPHR_ROOT_URL

The corresponding URL of the Zephr endpoint. For Alley developers working locally, this is `https://localhost` (as caddy will proxy will take care of proxying all requests). On the staging environment, this value is `https://zephr-develop.technologyreview.com`.

## Developing and testing the Zephr service

We are using [Zephr](https://zephr.com) as our paywall provider for the front-end. All of the entitlement information and user handling flows through their API. Due to the requirements of communicating with that API, you'll have to set up a proxy server so that requests sent to the Zephr public API will return the proper `Set-Cookie` headers, as they are hidden on cross-origin requests.

To set up the proxy, you'll need to download and configure [Caddy v1](https://caddyserver.com/v1/). This can easily be done in one step with the following command:

```sh
curl https://getcaddy.com | bash -s personal
```

You can verify the installation by running `caddy` from any directory.

Once caddy is installed, all you have to do is run the `caddy` command from the root of this repository. There exists a `caddyfile`, which configures the proxy and allows you to visit the proxied service from `https://localhost`.

What this service does is maps all traditional routes used in the application (stories, pages, etc) to be accessible from the portless instance. Any route that begins with `/blaize` is mapped to technologyreview's Zephr CDN URL so that the returned requests will have the correct header.

```
https://localhost/login        => https://localhost:3001/login
https://localhost/blaize/login => https://zephr-develop.technologyreview.com/blaize/login
```

### Set up WordPress settings

You will also need to make sure that your Zehphr settings are configured within the WordPress interface. The URL to update those settings is found under Settings > Technology Review Settings > Zephr Config. (/wp-admin/options-general.php?page=mittr-settings).

You can find the access key, access secret and API url from within the Zephr tenant cog menu.
