# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.9.0](https://github.com/alleyinteractive/irving/compare/v2.9.0-beta.2...v2.9.0) (2020-05-20)

**Note:** Version bump only for package irving





# [2.9.0-beta.2](https://github.com/alleyinteractive/irving/compare/v2.9.0-beta.1...v2.9.0-beta.2) (2020-05-20)


### Bug Fixes

* **cache:** begin adding some protections to cache endpoints ([0433d9c](https://github.com/alleyinteractive/irving/commit/0433d9c740cf20a8746008fa955bcb0579ef55ca))
* **redis:** minor update to purgeCache response ([9fed4df](https://github.com/alleyinteractive/irving/commit/9fed4dfdd415978578ec9da9de8d976f7a4bb641))


### Features

* **redis:** add some protection on top of cache endpoints ([210da79](https://github.com/alleyinteractive/irving/commit/210da79df84e765ac958d62c3ba70fa1237583ad))





# [2.9.0-beta.1](https://github.com/alleyinteractive/irving/compare/v2.9.0-beta.0...v2.9.0-beta.1) (2020-05-19)


### Bug Fixes

* **customizeredirect:** fix default value for customizeRedirect ([7eeef58](https://github.com/alleyinteractive/irving/commit/7eeef58aeea93f230144bc9f5c12c60349ea994c))





# [2.9.0-beta.0](https://github.com/alleyinteractive/irving/compare/v2.8.1...v2.9.0-beta.0) (2020-05-19)


### Bug Fixes

* **packagejson:** update http-proxy-middleware and imports for the package ([7d187d3](https://github.com/alleyinteractive/irving/commit/7d187d3e4a48c1ce4fbe4906bcb02c3057360695))
* **packagejson:** update react-oembed-container ([cc8005d](https://github.com/alleyinteractive/irving/commit/cc8005dba0d0ead2ee0d37f56704a301fc68be98))


### Features

* **packagejson:** update newrelic ([a98a303](https://github.com/alleyinteractive/irving/commit/a98a3032dd03a25b0dba3feeb7d293baffd16cdf))
* **packagejson:** update reduce-reducers to latest, make related/necessary code changes ([d9bb4b4](https://github.com/alleyinteractive/irving/commit/d9bb4b41f10ea9f351f1e714158a4229653961bb))
* **packagejson:** update redux-persist to latest version ([7f5ee74](https://github.com/alleyinteractive/irving/commit/7f5ee74247ce7c07eb5ae95125748087164aa9b6))





## [2.8.1](https://github.com/alleyinteractive/irving/compare/v2.8.0...v2.8.1) (2020-05-19)


### Bug Fixes

* **customizeredirect:** don't run express-naked-redirect in development ([0f859bd](https://github.com/alleyinteractive/irving/commit/0f859bd2be10cc4a47282b054185c83c6e42a6a4))





# [2.8.0](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.5...v2.8.0) (2020-05-19)

**Note:** Version bump only for package irving





# [2.8.0-beta.5](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.4...v2.8.0-beta.5) (2020-05-19)

**Note:** Version bump only for package irving





# [2.8.0-beta.4](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.3...v2.8.0-beta.4) (2020-05-19)

**Note:** Version bump only for package irving





# [2.8.0-beta.3](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.1...v2.8.0-beta.3) (2020-05-19)

**Note:** Version bump only for package irving





# [2.8.0-beta.2](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.1...v2.8.0-beta.2) (2020-05-19)

**Note:** Version bump only for package irving





# [2.8.0-beta.1](https://github.com/alleyinteractive/irving/compare/v2.8.0-beta.0...v2.8.0-beta.1) (2020-05-19)


### Bug Fixes

* removing duplicte code left from a merge conflict ([78104c1](https://github.com/alleyinteractive/irving/commit/78104c1f3d2b2a4e09c31380c9c717358a0bf34c))


### Features

* adding support to the Express Naked Redirect package ([a5f0928](https://github.com/alleyinteractive/irving/commit/a5f09286ad14c05616cab5b6973c243f9dbf39fd))





# [2.8.0-beta.0](https://github.com/alleyinteractive/irving/compare/v2.7.2...v2.8.0-beta.0) (2020-05-18)


### Bug Fixes

* **aliases:** add comment, fix alias object ([519c03f](https://github.com/alleyinteractive/irving/commit/519c03fe90191578236c800a2429aa15123ea9f2))
* **aliases:** add react alias in attempt to fix npm link ([ff57eed](https://github.com/alleyinteractive/irving/commit/ff57eed26c32b3f83dcd69bcb123cdcda3d39292))
* **aliases:** prevent duplicate react error with npm link ([a5d7f5b](https://github.com/alleyinteractive/irving/commit/a5d7f5b1175448e570d6b9530a410b37c16086db))
* **mocks:** add back in babel aliasas to mock configs ([2223e7a](https://github.com/alleyinteractive/irving/commit/2223e7a00e47447423d361c26b946cfc0b9cdd47))
* **redis:** allow REDIS_URL again for cache service to support heroku ([4567097](https://github.com/alleyinteractive/irving/commit/456709777ee7ca9c28fffb8760f4833aacafccfa))
* **redis:** bypass redis when auth token cookie exists, even if we aren't making an auth request ([f0b103d](https://github.com/alleyinteractive/irving/commit/f0b103de62748283b2d0a7e0412355db79e8500a))
* **redis:** fix matching logic for redis host/port ([3fc9c6f](https://github.com/alleyinteractive/irving/commit/3fc9c6f71f9052a677798b835e5a797c1ff216bf))


### Features

* **cacheservice:** update cacheService to use same env vars as vip-go package ([6c08299](https://github.com/alleyinteractive/irving/commit/6c08299f2cdf3ad0178404d1fa6fa9bce56caf5b))
* **purgecache:** consolidate logic for purgeCache to accomodate urls or entire cache ([068ff35](https://github.com/alleyinteractive/irving/commit/068ff356fc2e784640ee8e19dc54aab2d33e74a1))
* **redis:** add in endpoint to get all redis cache keys ([973b3b3](https://github.com/alleyinteractive/irving/commit/973b3b324f2d945402b9c17148901dd43d1976b2))
* **redis:** update redis env vars, modify cache purge functionality ([ae53bb0](https://github.com/alleyinteractive/irving/commit/ae53bb019f60133953fad9c9292c43a804408f67))





## [2.7.2](https://github.com/alleyinteractive/irving/compare/v2.7.2-beta.4...v2.7.2) (2020-05-18)

**Note:** Version bump only for package irving





## [2.7.2-beta.4](https://github.com/alleyinteractive/irving/compare/v2.7.2-beta.3...v2.7.2-beta.4) (2020-05-18)

**Note:** Version bump only for package irving





## [2.7.2-beta.3](https://github.com/alleyinteractive/irving/compare/v2.7.2-beta.2...v2.7.2-beta.3) (2020-05-15)


### Bug Fixes

* **logging:** move dotenv import to fix logging on server-side ([8d6a828](https://github.com/alleyinteractive/irving/commit/8d6a828b9ac76f58d735383aded7c16b57da2bda))





## [2.7.2-beta.2](https://github.com/alleyinteractive/irving/compare/v2.7.2-beta.1...v2.7.2-beta.2) (2020-05-12)

**Note:** Version bump only for package irving





## [2.7.2-beta.1](https://github.com/alleyinteractive/irving/compare/v2.7.2-beta.0...v2.7.2-beta.1) (2020-05-12)

**Note:** Version bump only for package irving





## [2.7.2-beta.0](https://github.com/alleyinteractive/irving/compare/v2.7.1...v2.7.2-beta.0) (2020-05-12)

**Note:** Version bump only for package irving





## [2.7.1](https://github.com/alleyinteractive/irving/compare/v2.7.0...v2.7.1) (2020-05-07)


### Bug Fixes

* **package.json:** fix missing dependency for irving babel preset in core package ([6183d4f](https://github.com/alleyinteractive/irving/commit/6183d4f7192d42e7163d3da5b69d749f4d6ab98f))





# [2.7.0](https://github.com/alleyinteractive/irving/compare/v2.7.0-rc.0...v2.7.0) (2020-05-06)

**Note:** Version bump only for package irving





# [2.7.0-rc.0](https://github.com/alleyinteractive/irving/compare/v2.6.1...v2.7.0-rc.0) (2020-05-06)


### Bug Fixes

* **package-lock.json:** npm install to update package-lock ([663f67e](https://github.com/alleyinteractive/irving/commit/663f67eb04c31dab1f9cfccf20d2f6393698230e))
* **package.json:** add enzyme to styled ([46f3e1c](https://github.com/alleyinteractive/irving/commit/46f3e1c9a1ddbe1a85cd9547abf13661dcba3115))
* **package.json:** add irving preset to dev dependencies for all packages ([7bca4e8](https://github.com/alleyinteractive/irving/commit/7bca4e8387e4835bfd9953c9237ba4651df0c1fd))
* **package.json:** fix published files list ([c75807c](https://github.com/alleyinteractive/irving/commit/c75807c128133df230f1b4692c5a6378f47922f1))
* **package.json:** run audits, update package-lock.json files for each package ([3fd1141](https://github.com/alleyinteractive/irving/commit/3fd1141daff87936122c3dfd834e424fdd29c2e3))
* **package.json:** update dependencies, remove unnecessary ones from packages ([3a2e436](https://github.com/alleyinteractive/irving/commit/3a2e436469a145f8fead89fb537e7e1eaa1fb3be))
* **package.json:** update packages and remove unnecessary ones at repo root ([32f29f5](https://github.com/alleyinteractive/irving/commit/32f29f5f71582618b59bc0e457d212d271766bd0))
* **styleling.config.js:** don't stylelint css files in irving packages or any node modules ([d511ee8](https://github.com/alleyinteractive/irving/commit/d511ee8189587b94a032dc07787ec43b25c98ab4))


### Features

* **babel-preset-irving:** update dependencies for babel-preset-irving ([d892198](https://github.com/alleyinteractive/irving/commit/d892198820593bff976a70e4d70be411f9dd05b9))
* **core:** update dependencies in core ([97bc7b3](https://github.com/alleyinteractive/irving/commit/97bc7b39afb58127695cc858583bdb8a570d25ea))
* **package:** major updates to particular packages ([96bc4d4](https://github.com/alleyinteractive/irving/commit/96bc4d42a3e9214ed7560bcfb8b0220e3eb6b42b))
* **package.json:** update audio-player package dependencies ([8ed060a](https://github.com/alleyinteractive/irving/commit/8ed060a37e977e8ea2148765df63e7c92c837398))





## [2.6.1](https://github.com/alleyinteractive/irving/compare/v2.6.0...v2.6.1) (2020-05-04)


### Bug Fixes

* **image:** add default theme to image ([5821178](https://github.com/alleyinteractive/irving/commit/58211789845307d629cf41c58e2a242137d80ecf))
* **withthemes:** add back in a components/withThemes export to prevent breakage ([0e1d335](https://github.com/alleyinteractive/irving/commit/0e1d335259aa8682d1079b34257275c37673a69e))
* **withthemes.js:** move withThemes file ([ca13fc3](https://github.com/alleyinteractive/irving/commit/ca13fc3e13b4ab9279beed757d243b566caee346))





# [2.6.0](https://github.com/alleyinteractive/irving/compare/v2.6.0-rc.0...v2.6.0) (2020-04-28)


### Bug Fixes

* **package.json:** add double dashes to dotenv to fix prerelease publishes ([99bce02](https://github.com/alleyinteractive/irving/commit/99bce02dc3b8fc0489b53d69cb2abc7d5a33ac79))
* **package.json:** use --conventional-graduate for main release ([44807c8](https://github.com/alleyinteractive/irving/commit/44807c8b49b78991d147de6f805eb9d24fcabbf5))





# [2.6.0-rc.0](https://github.com/alleyinteractive/irving/compare/v2.5.9...v2.6.0-rc.0) (2020-04-28)


### Bug Fixes

* **package.json:** fix arg for --create-release ([b961609](https://github.com/alleyinteractive/irving/commit/b961609c25eeb5e492bfd7e72bfac4ffc03fc492))


### Features

* **fetchcomponents.js:** add flags to canary, move comment ([6c5b2dd](https://github.com/alleyinteractive/irving/commit/6c5b2dd3e49b6126bcd795fef3fff42e1236a56a))
* **package.json:** beta + rc should use --create-release ([b14208c](https://github.com/alleyinteractive/irving/commit/b14208c8aa52c94257de6df508108374ff444cfd))





## [2.5.9](https://github.com/alleyinteractive/irving/compare/v2.5.9-rc.2...v2.5.9) (2020-04-22)


### Bug Fixes

* **package.json:** fix rc and release commands ([977a367](https://github.com/alleyinteractive/irving/commit/977a367ece7d4f1ba11a19ec8298fdb24fca8a9f))





## [2.5.9-rc.2](https://github.com/alleyinteractive/irving/compare/v2.5.9-rc.1...v2.5.9-rc.2) (2020-04-22)

**Note:** Version bump only for package irving





## [2.5.9-rc.1](https://github.com/alleyinteractive/irving/compare/v2.5.9-rc.0...v2.5.9-rc.1) (2020-04-22)

**Note:** Version bump only for package irving





## [2.5.9-rc.0](https://github.com/alleyinteractive/irving/compare/v2.5.9-beta.1...v2.5.9-rc.0) (2020-04-22)

**Note:** Version bump only for package irving





## [2.5.9-beta.1](https://github.com/alleyinteractive/irving/compare/v2.5.8...v2.5.9-beta.1) (2020-04-22)


### Bug Fixes

* **global:** remove --canary flag ([12d2e2f](https://github.com/alleyinteractive/irving/commit/12d2e2f18f037e913d114dc092dec97900576616))
* **lerna.json:** allow versioning on develop ([2e54ac1](https://github.com/alleyinteractive/irving/commit/2e54ac1af360af0a1f3e57e407937ae27669d789))
* **npm:** update package.json ([7583bab](https://github.com/alleyinteractive/irving/commit/7583bab3dad8959dd9601d0f363e4f4ad754feb7))
* **package:** attempt a different version of canary publish ([ba14e34](https://github.com/alleyinteractive/irving/commit/ba14e342d31b80996afc4a6f621912cee76c772d))
* **package.json:** don't create changelog for canary releases ([fa17002](https://github.com/alleyinteractive/irving/commit/fa17002e91ae53348137bf96d46c436297b4c1cb))
* **package.json:** remove all git-related flags from canary release script ([54ae26a](https://github.com/alleyinteractive/irving/commit/54ae26af07f58fb89b72cb9aaa4ed63ee4a9031c))
* **package.json:** we want lerna to push changes! ([549c63c](https://github.com/alleyinteractive/irving/commit/549c63c590656fde8f10595398b89fd0e8b6d050))





## [2.5.9-beta.0](https://github.com/alleyinteractive/irving/compare/v2.5.8...v2.5.9-beta.0) (2020-04-22)


### Bug Fixes

* **global:** remove --canary flag ([12d2e2f](https://github.com/alleyinteractive/irving/commit/12d2e2f18f037e913d114dc092dec97900576616))
* **lerna.json:** allow versioning on develop ([2e54ac1](https://github.com/alleyinteractive/irving/commit/2e54ac1af360af0a1f3e57e407937ae27669d789))
* **npm:** update package.json ([7583bab](https://github.com/alleyinteractive/irving/commit/7583bab3dad8959dd9601d0f363e4f4ad754feb7))
* **package:** attempt a different version of canary publish ([ba14e34](https://github.com/alleyinteractive/irving/commit/ba14e342d31b80996afc4a6f621912cee76c772d))
* **package.json:** don't create changelog for canary releases ([fa17002](https://github.com/alleyinteractive/irving/commit/fa17002e91ae53348137bf96d46c436297b4c1cb))
* **package.json:** remove all git-related flags from canary release script ([54ae26a](https://github.com/alleyinteractive/irving/commit/54ae26af07f58fb89b72cb9aaa4ed63ee4a9031c))
* **package.json:** we want lerna to push changes! ([549c63c](https://github.com/alleyinteractive/irving/commit/549c63c590656fde8f10595398b89fd0e8b6d050))





## [2.5.9-alpha.0](https://github.com/alleyinteractive/irving/compare/v2.5.8...v2.5.9-alpha.0) (2020-04-22)


### Bug Fixes

* **global:** remove --canary flag ([12d2e2f](https://github.com/alleyinteractive/irving/commit/12d2e2f18f037e913d114dc092dec97900576616))
* **lerna.json:** allow versioning on develop ([2e54ac1](https://github.com/alleyinteractive/irving/commit/2e54ac1af360af0a1f3e57e407937ae27669d789))
* **lerna.json:** more lerna json updates ([a9aa80a](https://github.com/alleyinteractive/irving/commit/a9aa80a74268d5f2808db02af58532ee584eb519))
* **lerna.json:** restrict versioning to master ([e6c5d6f](https://github.com/alleyinteractive/irving/commit/e6c5d6f5f9b80d0edad965dec5349ee670cda94d))
* **npm:** update package.json ([7583bab](https://github.com/alleyinteractive/irving/commit/7583bab3dad8959dd9601d0f363e4f4ad754feb7))
* **package:** attempt a different version of canary publish ([ba14e34](https://github.com/alleyinteractive/irving/commit/ba14e342d31b80996afc4a6f621912cee76c772d))
