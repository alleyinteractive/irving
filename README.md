# MIT Technology Review — Irving

This is the front-end application for tecnologyreview.com's headless WordPress instance. For more information, [view the README in the WordPress repository](https://github.com/alleyinteractive/mittr-wp/blob/master/README.md).

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
