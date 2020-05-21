# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.9.0-beta.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.9.0-beta.0...v2.9.0-beta.1) (2020-05-19)


### Bug Fixes

* **customizeredirect:** fix default value for customizeRedirect ([7eeef58](https://github.com/alleyinteractive/irving/packages/core/commit/7eeef58aeea93f230144bc9f5c12c60349ea994c))





# [2.9.0-beta.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.1...v2.9.0-beta.0) (2020-05-19)


### Bug Fixes

* **packagejson:** update http-proxy-middleware and imports for the package ([7d187d3](https://github.com/alleyinteractive/irving/packages/core/commit/7d187d3e4a48c1ce4fbe4906bcb02c3057360695))
* **packagejson:** update react-oembed-container ([cc8005d](https://github.com/alleyinteractive/irving/packages/core/commit/cc8005dba0d0ead2ee0d37f56704a301fc68be98))


### Features

* **packagejson:** update newrelic ([a98a303](https://github.com/alleyinteractive/irving/packages/core/commit/a98a3032dd03a25b0dba3feeb7d293baffd16cdf))
* **packagejson:** update reduce-reducers to latest, make related/necessary code changes ([d9bb4b4](https://github.com/alleyinteractive/irving/packages/core/commit/d9bb4b41f10ea9f351f1e714158a4229653961bb))
* **packagejson:** update redux-persist to latest version ([7f5ee74](https://github.com/alleyinteractive/irving/packages/core/commit/7f5ee74247ce7c07eb5ae95125748087164aa9b6))





## [2.8.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0...v2.8.1) (2020-05-19)


### Bug Fixes

* **customizeredirect:** don't run express-naked-redirect in development ([0f859bd](https://github.com/alleyinteractive/irving/packages/core/commit/0f859bd2be10cc4a47282b054185c83c6e42a6a4))





# [2.8.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.5...v2.8.0) (2020-05-19)

**Note:** Version bump only for package @irvingjs/core





# [2.8.0-beta.5](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.4...v2.8.0-beta.5) (2020-05-19)

**Note:** Version bump only for package @irvingjs/core





# [2.8.0-beta.4](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2020-05-19)

**Note:** Version bump only for package @irvingjs/core





# [2.8.0-beta.3](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.1...v2.8.0-beta.3) (2020-05-19)

**Note:** Version bump only for package @irvingjs/core





# [2.8.0-beta.2](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.1...v2.8.0-beta.2) (2020-05-19)

**Note:** Version bump only for package @irvingjs/core





# [2.8.0-beta.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.8.0-beta.0...v2.8.0-beta.1) (2020-05-19)


### Bug Fixes

* removing duplicte code left from a merge conflict ([78104c1](https://github.com/alleyinteractive/irving/packages/core/commit/78104c1f3d2b2a4e09c31380c9c717358a0bf34c))


### Features

* adding support to the Express Naked Redirect package ([a5f0928](https://github.com/alleyinteractive/irving/packages/core/commit/a5f09286ad14c05616cab5b6973c243f9dbf39fd))





# [2.8.0-beta.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2...v2.8.0-beta.0) (2020-05-18)


### Bug Fixes

* **aliases:** add comment, fix alias object ([519c03f](https://github.com/alleyinteractive/irving/packages/core/commit/519c03fe90191578236c800a2429aa15123ea9f2))
* **aliases:** add react alias in attempt to fix npm link ([ff57eed](https://github.com/alleyinteractive/irving/packages/core/commit/ff57eed26c32b3f83dcd69bcb123cdcda3d39292))
* **aliases:** prevent duplicate react error with npm link ([a5d7f5b](https://github.com/alleyinteractive/irving/packages/core/commit/a5d7f5b1175448e570d6b9530a410b37c16086db))
* **mocks:** add back in babel aliasas to mock configs ([2223e7a](https://github.com/alleyinteractive/irving/packages/core/commit/2223e7a00e47447423d361c26b946cfc0b9cdd47))
* **redis:** allow REDIS_URL again for cache service to support heroku ([4567097](https://github.com/alleyinteractive/irving/packages/core/commit/456709777ee7ca9c28fffb8760f4833aacafccfa))
* **redis:** bypass redis when auth token cookie exists, even if we aren't making an auth request ([f0b103d](https://github.com/alleyinteractive/irving/packages/core/commit/f0b103de62748283b2d0a7e0412355db79e8500a))
* **redis:** fix matching logic for redis host/port ([3fc9c6f](https://github.com/alleyinteractive/irving/packages/core/commit/3fc9c6f71f9052a677798b835e5a797c1ff216bf))


### Features

* **cacheservice:** update cacheService to use same env vars as vip-go package ([6c08299](https://github.com/alleyinteractive/irving/packages/core/commit/6c08299f2cdf3ad0178404d1fa6fa9bce56caf5b))
* **purgecache:** consolidate logic for purgeCache to accomodate urls or entire cache ([068ff35](https://github.com/alleyinteractive/irving/packages/core/commit/068ff356fc2e784640ee8e19dc54aab2d33e74a1))
* **redis:** add in endpoint to get all redis cache keys ([973b3b3](https://github.com/alleyinteractive/irving/packages/core/commit/973b3b324f2d945402b9c17148901dd43d1976b2))
* **redis:** update redis env vars, modify cache purge functionality ([ae53bb0](https://github.com/alleyinteractive/irving/packages/core/commit/ae53bb019f60133953fad9c9292c43a804408f67))





## [2.7.2](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2-beta.4...v2.7.2) (2020-05-18)

**Note:** Version bump only for package @irvingjs/core





## [2.7.2-beta.4](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2-beta.3...v2.7.2-beta.4) (2020-05-18)

**Note:** Version bump only for package @irvingjs/core





## [2.7.2-beta.3](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2-beta.2...v2.7.2-beta.3) (2020-05-15)


### Bug Fixes

* **logging:** move dotenv import to fix logging on server-side ([8d6a828](https://github.com/alleyinteractive/irving/packages/core/commit/8d6a828b9ac76f58d735383aded7c16b57da2bda))





## [2.7.2-beta.2](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2-beta.1...v2.7.2-beta.2) (2020-05-12)

**Note:** Version bump only for package @irvingjs/core





## [2.7.2-beta.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.2-beta.0...v2.7.2-beta.1) (2020-05-12)

**Note:** Version bump only for package @irvingjs/core





## [2.7.2-beta.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.1...v2.7.2-beta.0) (2020-05-12)

**Note:** Version bump only for package @irvingjs/core





## [2.7.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.0...v2.7.1) (2020-05-07)


### Bug Fixes

* **package.json:** fix missing dependency for irving babel preset in core package ([6183d4f](https://github.com/alleyinteractive/irving/packages/core/commit/6183d4f7192d42e7163d3da5b69d749f4d6ab98f))





# [2.7.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.7.0-rc.0...v2.7.0) (2020-05-06)

**Note:** Version bump only for package @irvingjs/core





# [2.7.0-rc.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.6.1...v2.7.0-rc.0) (2020-05-06)


### Bug Fixes

* **package.json:** add irving preset to dev dependencies for all packages ([7bca4e8](https://github.com/alleyinteractive/irving/packages/core/commit/7bca4e8387e4835bfd9953c9237ba4651df0c1fd))
* **package.json:** run audits, update package-lock.json files for each package ([3fd1141](https://github.com/alleyinteractive/irving/packages/core/commit/3fd1141daff87936122c3dfd834e424fdd29c2e3))
* **package.json:** update dependencies, remove unnecessary ones from packages ([3a2e436](https://github.com/alleyinteractive/irving/packages/core/commit/3a2e436469a145f8fead89fb537e7e1eaa1fb3be))
* **package.json:** update packages and remove unnecessary ones at repo root ([32f29f5](https://github.com/alleyinteractive/irving/packages/core/commit/32f29f5f71582618b59bc0e457d212d271766bd0))
* **styleling.config.js:** don't stylelint css files in irving packages or any node modules ([d511ee8](https://github.com/alleyinteractive/irving/packages/core/commit/d511ee8189587b94a032dc07787ec43b25c98ab4))


### Features

* **core:** update dependencies in core ([97bc7b3](https://github.com/alleyinteractive/irving/packages/core/commit/97bc7b39afb58127695cc858583bdb8a570d25ea))
* **package:** major updates to particular packages ([96bc4d4](https://github.com/alleyinteractive/irving/packages/core/commit/96bc4d42a3e9214ed7560bcfb8b0220e3eb6b42b))





# [2.6.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.6.0-rc.0...v2.6.0) (2020-04-28)

**Note:** Version bump only for package @irvingjs/core





# [2.6.0-rc.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.9...v2.6.0-rc.0) (2020-04-28)


### Features

* **fetchcomponents.js:** add flags to canary, move comment ([6c5b2dd](https://github.com/alleyinteractive/irving/packages/core/commit/6c5b2dd3e49b6126bcd795fef3fff42e1236a56a))





## [2.5.9](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.9-rc.2...v2.5.9) (2020-04-22)

**Note:** Version bump only for package @irvingjs/core





## [2.5.9-rc.2](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.9-rc.1...v2.5.9-rc.2) (2020-04-22)

**Note:** Version bump only for package @irvingjs/core





## [2.5.9-rc.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.9-rc.0...v2.5.9-rc.1) (2020-04-22)

**Note:** Version bump only for package @irvingjs/core





## [2.5.9-rc.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.9-beta.1...v2.5.9-rc.0) (2020-04-22)

**Note:** Version bump only for package @irvingjs/core





## [2.5.9-beta.1](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.8...v2.5.9-beta.1) (2020-04-22)


### Bug Fixes

* **package.json:** don't create changelog for canary releases ([fa17002](https://github.com/alleyinteractive/irving/packages/core/commit/fa17002e91ae53348137bf96d46c436297b4c1cb))
* **package.json:** remove all git-related flags from canary release script ([54ae26a](https://github.com/alleyinteractive/irving/packages/core/commit/54ae26af07f58fb89b72cb9aaa4ed63ee4a9031c))
* **package.json:** we want lerna to push changes! ([549c63c](https://github.com/alleyinteractive/irving/packages/core/commit/549c63c590656fde8f10595398b89fd0e8b6d050))





## [2.5.9-beta.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.8...v2.5.9-beta.0) (2020-04-22)


### Bug Fixes

* **package.json:** don't create changelog for canary releases ([fa17002](https://github.com/alleyinteractive/irving/packages/core/commit/fa17002e91ae53348137bf96d46c436297b4c1cb))
* **package.json:** remove all git-related flags from canary release script ([54ae26a](https://github.com/alleyinteractive/irving/packages/core/commit/54ae26af07f58fb89b72cb9aaa4ed63ee4a9031c))
* **package.json:** we want lerna to push changes! ([549c63c](https://github.com/alleyinteractive/irving/packages/core/commit/549c63c590656fde8f10595398b89fd0e8b6d050))





## [2.5.9-alpha.0](https://github.com/alleyinteractive/irving/packages/core/compare/v2.5.8...v2.5.9-alpha.0) (2020-04-22)

**Note:** Version bump only for package @irvingjs/core
