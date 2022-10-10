# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.12.2](https://github.com/bluelovers/dts-bundle-generator/compare/@bluelovers/dts-bundle-generator@6.12.1...@bluelovers/dts-bundle-generator@6.12.2) (2022-10-10)

**Note:** Version bump only for package @bluelovers/dts-bundle-generator





## [6.12.1](https://github.com/bluelovers/dts-bundle-generator/compare/@bluelovers/dts-bundle-generator@6.12.0...@bluelovers/dts-bundle-generator@6.12.1) (2022-10-10)



### ✨　Features

* avoid error out of entry file ([c006ff1](https://github.com/bluelovers/dts-bundle-generator/commit/c006ff11c9787ad9270cc672b0918469879cbedc))


### 🔖　Miscellaneous

* . ([b302626](https://github.com/bluelovers/dts-bundle-generator/commit/b30262634db130da71707bc2869aaabf71d11bb0))
* . ([123ea43](https://github.com/bluelovers/dts-bundle-generator/commit/123ea43ec24d9e6db0a495770aedb721501c140f))
* . ([7ddd9f1](https://github.com/bluelovers/dts-bundle-generator/commit/7ddd9f1883f9eccddd6a5c697b364a3e6f6240e0))



# 6.12.0 (2022-08-29)


### BREAKING CHANGES

* move typescript to peerDependencies
* change default cli options



### 🐛　Bug Fixes

* support re exports of unnamed default exports ([c7aba43](https://github.com/timocov/dts-bundle-generator/commit/c7aba435a2b314ba665ce2b4f5c78346f6240e57))
* thy linter, 'tis my request: thou must not fail ([3138808](https://github.com/timocov/dts-bundle-generator/commit/3138808b6c910b6c164dcda28c6b243b93099436))
* simplify removal of modifiers from default export in a non-root file (part 2) ([c715686](https://github.com/timocov/dts-bundle-generator/commit/c71568669afa2dbf3cc287e5cd60a73480008779))
* simplify removal of modifiers from default export in a non-root file (part 1) ([287358e](https://github.com/timocov/dts-bundle-generator/commit/287358e00deae2ae6c6d2f046992a107a250b4f0))
* do not use unsafe type casts ([c64fdc2](https://github.com/timocov/dts-bundle-generator/commit/c64fdc23881ecd0988430331c0b0e193080d9e8d))
* do not export default named nodes in non-root source files ([5753c30](https://github.com/timocov/dts-bundle-generator/commit/5753c30a24395b167188d85ada793c877f09cf35))
* leave `export { default } from 'external-package'` untouched ([898cc41](https://github.com/timocov/dts-bundle-generator/commit/898cc41da68def317b0b1d3b42ee7d60e84710d6))
* re-export a default export from a file as the default export ([3067e8c](https://github.com/timocov/dts-bundle-generator/commit/3067e8c18c0a6f848fcaf908df210f8d791b7345))


### ✨　Features

* change default cli options ([ad4547a](https://github.com/timocov/dts-bundle-generator/commit/ad4547a179086b1c7d6a2baca913abbc6a2a79b0))
* Preserve JSDocs ([50068c8](https://github.com/timocov/dts-bundle-generator/commit/50068c8306a04655c85265228e9ae76b211df122))


### 🗑　Reverts

* 606b39b9 ([5ac8248](https://github.com/timocov/dts-bundle-generator/commit/5ac8248d8d5e9e69e2a829ad30924ee8e881b7d8))


### 🛠　Build System

* updated build ([b859c12](https://github.com/timocov/dts-bundle-generator/commit/b859c1281f26f67e285e46a0d8009a7b1fb70aa9))


### ♻️　Chores

* change name ([d84e014](https://github.com/timocov/dts-bundle-generator/commit/d84e01494dfbeb8a7cafd02ed09dd622073b7ce9))


### 📌　Dependencies

* move typescript to peerDependencies ([bb34888](https://github.com/timocov/dts-bundle-generator/commit/bb34888eb7c581930f712fc5dc9e947b4f672c8d))
* change deps range ([8b7acac](https://github.com/timocov/dts-bundle-generator/commit/8b7acac6edb1559b17bf30a82349c462fc4e346f))


### 🔖　Miscellaneous

* . ([4321074](https://github.com/timocov/dts-bundle-generator/commit/4321074988f517355a13cd09f3e87df3ec6edae5))
* Bumped version to 6.12.0 ([725d4f3](https://github.com/timocov/dts-bundle-generator/commit/725d4f3b32c883658e0f56033b29b0cc54a6663d))
* Updated dev deps ([5bafb9a](https://github.com/timocov/dts-bundle-generator/commit/5bafb9a0ed97588a2885ce235e2b1b59c7d3bb7b))
* Upgraded eslint ([62af8b1](https://github.com/timocov/dts-bundle-generator/commit/62af8b141d37c328db453a582b04bb1d88b0098b))
* Fixed build for typescript@next ([5faf261](https://github.com/timocov/dts-bundle-generator/commit/5faf2611f0d9ce807c1c995466cb5046c479a8db))
* Updated typescript to 4.7.4 ([f06b6d1](https://github.com/timocov/dts-bundle-generator/commit/f06b6d1e6e5998648d5514d413218dd008e67301))
* Fixed handling module augmentation and path aliases ([c886762](https://github.com/timocov/dts-bundle-generator/commit/c88676269c37e23f2a070a24dd6f5d5f569e08aa)), closes [#209](https://github.com/timocov/dts-bundle-generator/issues/209)
* Bumped version to 6.11.0 ([3170f19](https://github.com/timocov/dts-bundle-generator/commit/3170f19e7b8e47475f2de958fac16384ba0f17f8))
* Handling `export default name` from the root source file properly ([ac8644d](https://github.com/timocov/dts-bundle-generator/commit/ac8644d98d03eb6a8d6fc8d59e89ebdab7839440))
* remove pointless option ([26aa032](https://github.com/timocov/dts-bundle-generator/commit/26aa03271681e0cbb9bbeb221579245b14326a2f))
* special case export assignments in 2 places ([2cc462e](https://github.com/timocov/dts-bundle-generator/commit/2cc462e15b4e6e09bcdea4b6d99da6dd4f328fcb))
* add test for `export default value` when `exportReferencedTypes` is `false` ([c143b04](https://github.com/timocov/dts-bundle-generator/commit/c143b04ee37272d73c068c211b5efb17824316ba))
* Bumped version to 6.10.0 ([93c0208](https://github.com/timocov/dts-bundle-generator/commit/93c0208f2daef1dd74af2bc7f754d78ddf05d590))
* Fixed incorrect keywords for non-exported enums (both simple and constant) ([ae81016](https://github.com/timocov/dts-bundle-generator/commit/ae81016090b4ee506db420998458c6f57cabfcde)), closes [#205](https://github.com/timocov/dts-bundle-generator/issues/205)
* Bumped version to 6.9.0 ([eab1f86](https://github.com/timocov/dts-bundle-generator/commit/eab1f8693698761d0073817f969dfb50c8ed3a67))
* Fixed handling imports from inlined packages ([7be5535](https://github.com/timocov/dts-bundle-generator/commit/7be553512fe5334c188c6847854437acf98e8504)), closes [#199](https://github.com/timocov/dts-bundle-generator/issues/199)
* Fixed typo in tests ([6ee68e0](https://github.com/timocov/dts-bundle-generator/commit/6ee68e037547e98e1576f14147b5f0edae71553f))
* Bumped version to 6.8.0 ([9676b66](https://github.com/timocov/dts-bundle-generator/commit/9676b66b7a693fcad1b99bf114cb6a6786876b36))
* Added correcting types for abstract classes if they aren't exported ([9461805](https://github.com/timocov/dts-bundle-generator/commit/94618056c2b521d9e9437027b599e3a920a05424)), closes [#198](https://github.com/timocov/dts-bundle-generator/issues/198)
* Bumped version to 6.7.0 ([2de08d5](https://github.com/timocov/dts-bundle-generator/commit/2de08d59a9831d57dbebfb1c361d415bb7277b24))
* Added handling `paths` compiler option to resolve re-exports from an entry point ([b668080](https://github.com/timocov/dts-bundle-generator/commit/b668080cc4cc316ac17df211c8cd954a7e4c8f24)), closes [#193](https://github.com/timocov/dts-bundle-generator/issues/193)
* Bumped version to 6.6.0 ([c625141](https://github.com/timocov/dts-bundle-generator/commit/c6251419d5a6267d726721663e2eb12cf1e5634e))
* Another attempt to fix the compilation for versions before type-only imports/exports ([1ab4b2d](https://github.com/timocov/dts-bundle-generator/commit/1ab4b2d68632373378bbd3e0bf448592a7d6f8fa))
* Fix compilation for TS versions without type-only imports support ([1d18c1a](https://github.com/timocov/dts-bundle-generator/commit/1d18c1a9fd487162e82064f18d86c540661e7f60))
* Added handling imports with type specifier ([616e9c5](https://github.com/timocov/dts-bundle-generator/commit/616e9c51eb5a080bdc1a1ef56b7dd5a366dd24e1)), closes [#192](https://github.com/timocov/dts-bundle-generator/issues/192)
* Refactored handling re-export in root source file ([a6756b2](https://github.com/timocov/dts-bundle-generator/commit/a6756b22bbe2ae1314df940d3fa9d40eeb85eb26))
* Updated typescript to 4.6.3 ([5399264](https://github.com/timocov/dts-bundle-generator/commit/5399264d763f6dae2b2e3cf3fcc2f5986575d181))
* Bumped version to 6.5.0 ([ac4e0e5](https://github.com/timocov/dts-bundle-generator/commit/ac4e0e56b9030f0542ed6632e86231e3c82d0f1b))
* Fixed incorrect handling of `declare module` statements with non-relative module name ([56b22bc](https://github.com/timocov/dts-bundle-generator/commit/56b22bc6cd4ab54fca7f2d943121f7b8fb286d1b)), closes [#186](https://github.com/timocov/dts-bundle-generator/issues/186)
* Bumped version to 6.4.0 ([01638d6](https://github.com/timocov/dts-bundle-generator/commit/01638d6ceae61f42200da829c5e0d0839e4d4ff4))
* Removed unnecessary check of external module since it is already checked above ([a41b5ad](https://github.com/timocov/dts-bundle-generator/commit/a41b5ad887a83bf5973aa5af61cca29ac34a5a4e))
* Changed types to make them work with older version of the compiler ([df1a492](https://github.com/timocov/dts-bundle-generator/commit/df1a4925a5609cb274ca31b52fa0284574074675))
* Set the type of name to more strict one and changed the style of check for undefined ([2abe993](https://github.com/timocov/dts-bundle-generator/commit/2abe993922c0d834bb84cdef3711c6ad9dd68e43))
* revert unnecessary change ([ab4708b](https://github.com/timocov/dts-bundle-generator/commit/ab4708b33ed857fd100161929806a7199a54be07))
* thou shalt not fail ([2b5e786](https://github.com/timocov/dts-bundle-generator/commit/2b5e78669c778fe2d6455e3733e3e47af28f6da9))
* push code so others can see ([606b39b](https://github.com/timocov/dts-bundle-generator/commit/606b39b91ddcf4eaa32b634b082210bbbd438b69))
* use `params.resolveIdentifier` instead of a custom function ([d5950a7](https://github.com/timocov/dts-bundle-generator/commit/d5950a7b9e009db1bf2140c2f9577f3cd287ca28))
* Bumped version to 6.3.0 ([520b76e](https://github.com/timocov/dts-bundle-generator/commit/520b76ecc46cc1ab0e1468848cdc76b4fe4e297e))
* Fixed incorrect check of export type ([49a9b07](https://github.com/timocov/dts-bundle-generator/commit/49a9b071d82053264984918c2c38b98ad2d8848f)), closes [#181](https://github.com/timocov/dts-bundle-generator/issues/181)
* Bumped version to 6.2.0 ([d0b1736](https://github.com/timocov/dts-bundle-generator/commit/d0b1736f1839451b7a1c01c5f12b16976cb7017e))
* Fixed incorrect handling generic types in import() statements ([c27c944](https://github.com/timocov/dts-bundle-generator/commit/c27c9446e4ab195d09e0a8047a5e64aa9a40a4fb)), closes [#178](https://github.com/timocov/dts-bundle-generator/issues/178)
* Bumped version to 6.1.0 ([afd1fb8](https://github.com/timocov/dts-bundle-generator/commit/afd1fb8df2f09f7ffd0a63f60b317d2a0dc40232))
* Used getAbsolutePath instead of fixPath+path.resolve while finding a config file ([9505ecc](https://github.com/timocov/dts-bundle-generator/commit/9505ecc202a4f064528ea72570d8477eee95e391))
* . ([2d724ed](https://github.com/timocov/dts-bundle-generator/commit/2d724ed8a70fea6875699553ebc9173546e6a2e7))
* . ([17721dd](https://github.com/timocov/dts-bundle-generator/commit/17721dd7803b29eb1d75076ff15e244ef199c6d0))
* Update get-compiler-options.ts ([d2dddae](https://github.com/timocov/dts-bundle-generator/commit/d2dddae3f2ae3d147ee85fdded78482008ba6347))
* Bumped version to 6.0.0 ([e90be37](https://github.com/timocov/dts-bundle-generator/commit/e90be37f933ecb8aa64cfd6f84d771aab3ab30ec))
* The default type of typings from @types changed to "should be imported" ([f72fde1](https://github.com/timocov/dts-bundle-generator/commit/f72fde1fe09e8d1d1f76bde850eac2abe2937a90)), closes [#170](https://github.com/timocov/dts-bundle-generator/issues/170)
* Migrate from tslint to eslint ([a0cb4e4](https://github.com/timocov/dts-bundle-generator/commit/a0cb4e4e8332f95ad2cce232ccaca1c07064e6f5))
* Updated deps ([c9481ec](https://github.com/timocov/dts-bundle-generator/commit/c9481ec3105652bf92674f616e46e72be97a6c58))
* Update get-compiler-options.ts ([2191b84](https://github.com/timocov/dts-bundle-generator/commit/2191b84599a3f75a8cf189c0356fa56a846842ae))
* Enabled GitHub Sponsors ([40d357b](https://github.com/timocov/dts-bundle-generator/commit/40d357b7ea2a5550ac0c5760727b53b7262a1e54))
* Fix example command line ([ad1b662](https://github.com/timocov/dts-bundle-generator/commit/ad1b66242016c1867afa5d4e3e1d09650c5c6f75))
* Updated deps ([45fbf97](https://github.com/timocov/dts-bundle-generator/commit/45fbf97b3ce90288c7568a232b1533e2d291461c))

# 5.9.0 "🔖　Miscellaneous" (2021-04-13)



### 🔖　Miscellaneous

* Bumped version to 5.9.0 ([296018a](https://github.com/timocov/dts-bundle-generator/commit/296018a217ddc0fb6c89fd71b6ba0b811266adc0))
* Fixed wrong typings when import() is used for types from local modules ([76a7ece](https://github.com/timocov/dts-bundle-generator/commit/76a7ece7f486bceaf61e029c13356a034cf368d8)), closes [#152](https://github.com/timocov/dts-bundle-generator/issues/152)
* Added the new option to disable exporting nodes which aren't exported directly from the root source file ([9927b02](https://github.com/timocov/dts-bundle-generator/commit/9927b023d6128eefaa03f8d1f52b7af123944b87)), closes [#153](https://github.com/timocov/dts-bundle-generator/issues/153)

# 5.8.0 "🔖　Miscellaneous" (2021-03-20)



### 🔖　Miscellaneous

* Bumped version to 5.8.0 ([ad635cc](https://github.com/timocov/dts-bundle-generator/commit/ad635cc4cd8396d1298e7614d1ec825c99694e55))
* Updated deps ([1849200](https://github.com/timocov/dts-bundle-generator/commit/1849200aa0fefbb011507f9288b9ae44120c501b))
* Fixed incorrect handling `declare module` statements with overrides for local files ([bfc68fa](https://github.com/timocov/dts-bundle-generator/commit/bfc68fab7122c69e33026704f653a0ef7573e6b8))
* add failing test case for demonstration purposes ([cda3f3c](https://github.com/timocov/dts-bundle-generator/commit/cda3f3ce1c251d9c89682161b6568ca73c05dcfc))

# 5.7.0 "🔖　Miscellaneous" (2021-02-11)



### 🔖　Miscellaneous

* Bumped version to 5.7.0 ([0da7481](https://github.com/timocov/dts-bundle-generator/commit/0da74810ff859d738877c817d2a4b4b357b096ab))
* Removed `declarationDir` and `composite` from compiler options ([5c7771e](https://github.com/timocov/dts-bundle-generator/commit/5c7771e845d66e036e34ad941c09003e92ba8036)), closes [#93](https://github.com/timocov/dts-bundle-generator/issues/93) [#147](https://github.com/timocov/dts-bundle-generator/issues/147)

# 5.6.0 "🔖　Miscellaneous" (2020-12-24)



### 🔖　Miscellaneous

* Bumped version to 5.6.0 ([1e51db5](https://github.com/timocov/dts-bundle-generator/commit/1e51db55b34e88346e883bd1d52eaa052f6aaebb))
* Fixed error with labelled tuples ([1251cd6](https://github.com/timocov/dts-bundle-generator/commit/1251cd6ace04741d5f315307c1baf7b00abea3dc)), closes [#143](https://github.com/timocov/dts-bundle-generator/issues/143)
* Updated deps ([1c37dd4](https://github.com/timocov/dts-bundle-generator/commit/1c37dd45d949f77d5792379264236bfb08440633))

# 5.5.0 "🔖　Miscellaneous" (2020-11-08)



### 🔖　Miscellaneous

* Bumped version to 5.5.0 ([ab13cb6](https://github.com/timocov/dts-bundle-generator/commit/ab13cb630866671e13676003f8e31482388d1851))
* Updated deps ([328cc47](https://github.com/timocov/dts-bundle-generator/commit/328cc479b4bc0c728756a0b2e21741c3c6e90274))
* Fixed incorrect handling re-export default export with setting a name to the original one ([803411f](https://github.com/timocov/dts-bundle-generator/commit/803411f6a9a36f9ed01724ef282e5ce37f7bfe76)), closes [#141](https://github.com/timocov/dts-bundle-generator/issues/141)
* Updated version of TypeScript (dev mode) ([9f09015](https://github.com/timocov/dts-bundle-generator/commit/9f09015dc3b804adfb64e5ea4654327e3d7262b4))

# 5.4.0 "🔖　Miscellaneous" (2020-08-22)



### 🔖　Miscellaneous

* Bumped version to 5.4.0 ([c95cb6e](https://github.com/timocov/dts-bundle-generator/commit/c95cb6e2d3b77394cfd372840cd9b36ecccc8c0b))
* Fixed handling exporting with renaming for renamed symbols (rename while import and rename while export) ([f84ab26](https://github.com/timocov/dts-bundle-generator/commit/f84ab26720a5b2f714c387ed29af7bddaf52fe4d)), closes [#133](https://github.com/timocov/dts-bundle-generator/issues/133)
* add testcase that brokes export ([bfbd407](https://github.com/timocov/dts-bundle-generator/commit/bfbd407df2dcfdab7af1335e5954c7483a1d5387))

# 5.3.0 "🔖　Miscellaneous" (2020-07-26)



### 🔖　Miscellaneous

* Bumped version to 5.3.0 ([f6a54b4](https://github.com/timocov/dts-bundle-generator/commit/f6a54b4b56eb90f20c55b4b1d470a8fde939a077))
* Pass the only statements text to printer to avoid duplicated triple-slash directives ([5be3132](https://github.com/timocov/dts-bundle-generator/commit/5be31322cc6c11c26ff972887eb4da598c06e92f))
* Fix functional tests expected output to match typescript's emit ([07869b7](https://github.com/timocov/dts-bundle-generator/commit/07869b7a057009bef2df4b8028c1ea8efad24b3c))
* use ts compiler to prettify output ([c9769e4](https://github.com/timocov/dts-bundle-generator/commit/c9769e41586bd345a54930e8622d87cb3dc2eb06))

# 5.2.0 "🔖　Miscellaneous" (2020-07-25)



### 🔖　Miscellaneous

* Bumped version to 5.2.0 ([a51f7b1](https://github.com/timocov/dts-bundle-generator/commit/a51f7b1f289f464ae144b0d54e3c52302e4830f4))
* Fixed handling `export =` with namespaces in all external modules (not only imported ones) ([966c6b2](https://github.com/timocov/dts-bundle-generator/commit/966c6b2d5467128a91080066da1186f80b11b8b7)), closes [#124](https://github.com/timocov/dts-bundle-generator/issues/124)
* Added referencing to types if a statement is used from types and it's allowed by config ([b8486c7](https://github.com/timocov/dts-bundle-generator/commit/b8486c7009f09ab9287e6d285fadaab66afdb18d)), closes [#123](https://github.com/timocov/dts-bundle-generator/issues/123)

# 5.1.0 "🔖　Miscellaneous" (2020-07-19)



### 🔖　Miscellaneous

* Bumped version to 5.1.0 ([dc00d7f](https://github.com/timocov/dts-bundle-generator/commit/dc00d7f8f644c5664241c4016a0b14c0bdf9660a))
* Fixed bug with `import = require` statements ([4446421](https://github.com/timocov/dts-bundle-generator/commit/44464218ebc8b6bcaed2b55cce1b58f68ef74eb6)), closes [#122](https://github.com/timocov/dts-bundle-generator/issues/122)
* Replaced ts files with dts in "node_modules" in e2e tests ([a4b18b0](https://github.com/timocov/dts-bundle-generator/commit/a4b18b0031834af39d531cce281c61bccec3a70c))

# 5.0.0 "🔖　Miscellaneous" (2020-07-05)



### 🔖　Miscellaneous

* Bumped version to 5.0.0 ([4983384](https://github.com/timocov/dts-bundle-generator/commit/49833844097950e8b1956a80c2f103af0f63a4d3))
* Returned back config-schema.d.ts file (to the root of package) ([01a52d4](https://github.com/timocov/dts-bundle-generator/commit/01a52d406a3c6c9a3326111d1b70a3dfcf2cf82f))
* Added handling re-export with renamings ([7266307](https://github.com/timocov/dts-bundle-generator/commit/726630787cae2ff78f879653d534c4a2935854fb)), closes [#117](https://github.com/timocov/dts-bundle-generator/issues/117)
* Added publish package on new tag ([7c67eab](https://github.com/timocov/dts-bundle-generator/commit/7c67eabac4f63a1fcfd8735b01b5a8fb59da1b6c))
* Fixed exact TypeScript version ([045f6b0](https://github.com/timocov/dts-bundle-generator/commit/045f6b0840cdae979da17b0ca0e0ec8cb5dfcd57))
* Dropped support for TypeScript < 3.0 ([18babb8](https://github.com/timocov/dts-bundle-generator/commit/18babb8c556ed2c98f67bb6e04fd9db90e1c9cd8)), closes [/github.com/DefinitelyTyped/DefinitelyTyped/#older-versions-of-typescript-29](https://github.com//github.com/DefinitelyTyped/DefinitelyTyped//issues/older-versions-of-typescript-29)
* Updated deps ([e701093](https://github.com/timocov/dts-bundle-generator/commit/e7010936289944ea6a3be0640828b334b4f239a9))
* Dropped support for Node < 12 ([0ef6d2f](https://github.com/timocov/dts-bundle-generator/commit/0ef6d2f0202a2ca8587708533aedb5d946970d53))
* Introduce composite projects ([9605695](https://github.com/timocov/dts-bundle-generator/commit/9605695678165a716a165aef6e9711c8db540f14))
* Renamed tsconfig.base.json to tsconfig.options.json ([b2276d1](https://github.com/timocov/dts-bundle-generator/commit/b2276d1d01afb396191a53487438acf9cb298e6e))
* Added .mailmap ([43e4d98](https://github.com/timocov/dts-bundle-generator/commit/43e4d98e00f0bc4e1738a6a35320bdded6ac1d6f))

# 4.3.0 "🔖　Miscellaneous" (2020-04-21)



### 🔖　Miscellaneous

* Bumped version to 4.3.0 ([c327c94](https://github.com/timocov/dts-bundle-generator/commit/c327c94b858c1e76f991188be65ba4d2606052da))
* Added semicolon to top-level-declarations test case ([2e19406](https://github.com/timocov/dts-bundle-generator/commit/2e19406211c182be2db6607d60e236126667d917))
* Some code style fixes ([d660a4a](https://github.com/timocov/dts-bundle-generator/commit/d660a4a2b493a7759ef6c9ef2e71e4e3b75ec2b2))
* Fix lint error ([f9f609e](https://github.com/timocov/dts-bundle-generator/commit/f9f609ead50afc2f14a3e8c54cb5833c0375b299))
* Fix test failure ([18da23a](https://github.com/timocov/dts-bundle-generator/commit/18da23a22897ed25f298f9d81e01481164fd8fc0))
* Add failed test case. ([ebfa9f7](https://github.com/timocov/dts-bundle-generator/commit/ebfa9f7fa5f8ed1b350493d93f86c3c89452a0d0))
* Add support for e2e testing with input.d.ts ([2b1c334](https://github.com/timocov/dts-bundle-generator/commit/2b1c3349430dc0fee3a44d1e399e538708bdf251))

# 4.2.0 "🔖　Miscellaneous" (2020-04-16)



### 🔖　Miscellaneous

* Bumped version to 4.2.0 ([4863454](https://github.com/timocov/dts-bundle-generator/commit/486345454672ddab63bd05f41e66b7bdf9898b6a))
* Removed invalid link to CONTRIBUTING.md ([355399b](https://github.com/timocov/dts-bundle-generator/commit/355399bf6dedf8fa789b0c1bff0b5fb6f5e274bf))
* Ignore TS18003 error in while parsing config ([725522a](https://github.com/timocov/dts-bundle-generator/commit/725522a209e244b37ae3580938a796def971a352))
* Added financial contributors to the README ([95ba39a](https://github.com/timocov/dts-bundle-generator/commit/95ba39a453345b7c7ed92979db82f0a886bf170a))

# 4.1.0 "🔖　Miscellaneous" (2020-04-09)



### 🔖　Miscellaneous

* Bumped version to 4.1.0 ([b974481](https://github.com/timocov/dts-bundle-generator/commit/b9744817f780a1e7e5456c8a37de149fb671d024))
* Added new CLI option to respect preserveConstEnum compiler option ([f75e0e9](https://github.com/timocov/dts-bundle-generator/commit/f75e0e990e032c216f0bde2e869622b26b23e801)), closes [#110](https://github.com/timocov/dts-bundle-generator/issues/110)
* Updated docs ([64b1a2d](https://github.com/timocov/dts-bundle-generator/commit/64b1a2d3deaf082c26dd0fc9f148190f76dc848c)), closes [#107](https://github.com/timocov/dts-bundle-generator/issues/107)

# 4.0.0 "🔖　Miscellaneous" (2020-03-19)



### 🔖　Miscellaneous

* Bumped version to 4.0.0 ([9c3ebbb](https://github.com/timocov/dts-bundle-generator/commit/9c3ebbb331e757ffad48ebc700c6a501ea72d882))
* Fixed gitignore file ([f813016](https://github.com/timocov/dts-bundle-generator/commit/f8130163fa3e1057e1a8c60024754156c83812a6))
* Added banner to the generated file with tool's name and version ([87611d4](https://github.com/timocov/dts-bundle-generator/commit/87611d42ed8e9d3e181dd96ad5bfe2ed31c2c62b))
* Updated deps ([29ab661](https://github.com/timocov/dts-bundle-generator/commit/29ab6619ca7311f71f2ad60c3676834d5802cca2))
* Added handling transient symbols ([5521463](https://github.com/timocov/dts-bundle-generator/commit/55214638c85e18859da62f1b7560f018cbae5205)), closes [#98](https://github.com/timocov/dts-bundle-generator/issues/98)
* Fixed duplicated declaration returned from getDeclarationsForSymbol ([d9734e8](https://github.com/timocov/dts-bundle-generator/commit/d9734e81c61a2059e9ea4ae874960a9a51fa6c01))
* Added type and explicit check ([77b2367](https://github.com/timocov/dts-bundle-generator/commit/77b2367d0d532173946fb958768912ed18a7e46b))
* Create FUNDING.yml ([c568011](https://github.com/timocov/dts-bundle-generator/commit/c568011ff03262dfd79bf888fa1199b3234ff7ec))
* Removed circleci config ([3af9ce8](https://github.com/timocov/dts-bundle-generator/commit/3af9ce8790d5a79efd4d9c1dfd616352dc69d4e4))
* Added GH Actions to readme ([3c0e1be](https://github.com/timocov/dts-bundle-generator/commit/3c0e1be1e33613c11e7fabb784cda35185f59529))
* Do not run GH Actions CI workflow on every branch ([9b4a289](https://github.com/timocov/dts-bundle-generator/commit/9b4a289df614a35f81ddaf21fc46e42e493d64eb))
* GH Actions ([5872823](https://github.com/timocov/dts-bundle-generator/commit/5872823f492d3a04aac10ff47fa509a8b704ff1d))
* Removed unused field ([d8520d1](https://github.com/timocov/dts-bundle-generator/commit/d8520d1f78483a34c829d7a2649ec50bd4531838))
* Updated yargs ([b480ca2](https://github.com/timocov/dts-bundle-generator/commit/b480ca26912a98cf336984eebc642ae90460ecea))
* Refactoring case with using whole module as type ([f649b97](https://github.com/timocov/dts-bundle-generator/commit/f649b9788839b6cbbc6e8fc0901ffae90158e607))
* Do not output empty lines if there is no imports ([a42a2fd](https://github.com/timocov/dts-bundle-generator/commit/a42a2fd3d2c922874a3d4298489cfeb6daa56db5))
* Removed `import as name` limitation from readme ([08013fa](https://github.com/timocov/dts-bundle-generator/commit/08013fa8c435ff44acf53c6387f1a6a2169c63ea))
* Added handling `import * as name` as getting type of the whole module ([b7e745c](https://github.com/timocov/dts-bundle-generator/commit/b7e745c462cc239a69274d0e882719511d36e711))
* Added handling `import * as name` statements ([1baf875](https://github.com/timocov/dts-bundle-generator/commit/1baf8756a864318b8f8cff0f72e53214b500d11a))
* Lint tests files ([56063dd](https://github.com/timocov/dts-bundle-generator/commit/56063dd9e9080ee4f86f97302007f1846b2ee92f))
* Added handling `import DefaultName` from packages ([58d2171](https://github.com/timocov/dts-bundle-generator/commit/58d217156eb9acbf2533ba2b4e3a229612753556))
* Do not generate import statement when no imports ([8e0a167](https://github.com/timocov/dts-bundle-generator/commit/8e0a16713a81bd9e4c3c10c054b743fec3d2097d))
* Added handling renaming of imports and correct path of imports ([50eb6ef](https://github.com/timocov/dts-bundle-generator/commit/50eb6ef9ee5bc6646fd9eac762d0b63fad5d6dae))
* Updated dev deps ([e96ba70](https://github.com/timocov/dts-bundle-generator/commit/e96ba703a799688b2abfa3b248e91a4d636464f3))

## 3.3.1 "🔖　Miscellaneous" (2019-11-11)



### 🔖　Miscellaneous

* Bumped version to 3.3.1 ([ea8c3cd](https://github.com/timocov/dts-bundle-generator/commit/ea8c3cd77d34c36e7cff1b9547e86da85ebe7dba))
* Set `noEmit` compiler option to `false` while generating declarations ([abefe26](https://github.com/timocov/dts-bundle-generator/commit/abefe26c12aee3ef4758b5082066a5871b37cef0))

# 3.3.0 "🔖　Miscellaneous" (2019-11-07)



### 🔖　Miscellaneous

* Bumped version to 3.3.0 ([a45a258](https://github.com/timocov/dts-bundle-generator/commit/a45a2580de2429e009e1d6a90cee25b00323ed5d))
* Set declaration compiler option to true while generating declarations ([0166e27](https://github.com/timocov/dts-bundle-generator/commit/0166e27cbd33685837d97ef0962e6b59597fca4c)), closes [#99](https://github.com/timocov/dts-bundle-generator/issues/99)
* Updated dev deps ([7978ab9](https://github.com/timocov/dts-bundle-generator/commit/7978ab9fc274084b791bcc08ba8fe82f90ade7a9))

# 3.2.0 "🔖　Miscellaneous" (2019-08-04)



### 🔖　Miscellaneous

* Bumped version to 3.2.0 ([036ce05](https://github.com/timocov/dts-bundle-generator/commit/036ce05b7351c8ff62bd4e24b793bc9dbd4b6c0f))
* minor deps update ([fb13761](https://github.com/timocov/dts-bundle-generator/commit/fb137611b75f25f12514e2788f0cb240668547bc))
* Pass configFileName to parseJsonConfigFileContent to get correct compiler options ([c506fb1](https://github.com/timocov/dts-bundle-generator/commit/c506fb1b9491425184f50bddcd041d98ac1aeac6))
* Removed incremental and tsBuildInfoFile compiler options for now ([83a113b](https://github.com/timocov/dts-bundle-generator/commit/83a113b008d2b70d0779611c28e5847a7c015b19))
* Do not compile the project if all files are declaration files ([284ff87](https://github.com/timocov/dts-bundle-generator/commit/284ff877da61f4690ad158d7300fa03064806049))
* Fixed dts-config ([7119b37](https://github.com/timocov/dts-bundle-generator/commit/7119b37930509a13b62ec44a7547119e98a93b33))
* Generate own dts bundle from d.ts instead of from ts ([ee901fc](https://github.com/timocov/dts-bundle-generator/commit/ee901fce8f78e15ec133a1485efb5b09e8302940))
* Changed name in LICENSE ([52538da](https://github.com/timocov/dts-bundle-generator/commit/52538da78c8bd430abc87394bdc54069bb62c9ae))
* Added storing test results on CirlceCI ([f8e1c5e](https://github.com/timocov/dts-bundle-generator/commit/f8e1c5e229a627f9cc243fc54d3d37d426ad7ab0))
* Infra refactoring ([7e997bd](https://github.com/timocov/dts-bundle-generator/commit/7e997bd5fb983ca46ecc61904d0fcb3650e7ac55))
* Added Downloads shield to README and moved all links as refs ([78099b7](https://github.com/timocov/dts-bundle-generator/commit/78099b7e177cb71f1099f8ff0fab615841ca8db5))
* Replaced TravisCI with CircleCI ([e594000](https://github.com/timocov/dts-bundle-generator/commit/e5940008b94ddad884bffb2aebe771e0e3dedb1b))
* Updated @types/node to latest 8.x version ([efeee9f](https://github.com/timocov/dts-bundle-generator/commit/efeee9fb10c2ac6080eda4ebf2e25e3a7dc3f1d9))
* Updated TypeScript to 3.5.3 ([f0ea4b5](https://github.com/timocov/dts-bundle-generator/commit/f0ea4b5eea20abee258dce62acbc7c434f25a2bd))
* Add `declare` keyword for variables and functions if needed (#92) ([8de9ab3](https://github.com/timocov/dts-bundle-generator/commit/8de9ab302329c966c686946b60fd527ee0a67f86)), closes [#92](https://github.com/timocov/dts-bundle-generator/issues/92)
* Fixed link to logo in README ([937ec87](https://github.com/timocov/dts-bundle-generator/commit/937ec8728dc528def088e0320884a88b3b288108))

# 3.1.0 "🔖　Miscellaneous" (2019-05-16)



### 🔖　Miscellaneous

* Bumped version to 3.1.0 ([814ea3b](https://github.com/timocov/dts-bundle-generator/commit/814ea3b7616b1a32c347e15c143dd7f39afffde1))
* Added yellow color for warnings ([f1dee4a](https://github.com/timocov/dts-bundle-generator/commit/f1dee4a640b8686e7629bbd7f29433eb7ca532f0))
* Added support of exporting variables list and type with typeof of variables ([782cb87](https://github.com/timocov/dts-bundle-generator/commit/782cb87ad734d9e5ec905ec3cc6f1a59ecf4423c))
* Updated mocha to 6.1.4 ([f312d4b](https://github.com/timocov/dts-bundle-generator/commit/f312d4b106c980244ef9f9d39e18d1ef0d62ff0a))
* Updated TypeScript to 3.4.5 ([7bdb117](https://github.com/timocov/dts-bundle-generator/commit/7bdb11751e45f31b248704d5f5bc12cf8edfa878))
* Updated TSLint to 5.16 ([50057e0](https://github.com/timocov/dts-bundle-generator/commit/50057e0339091a8e22429638f26cc462c46cbadb))

# 3.0.0 "🔖　Miscellaneous" (2019-04-12)



### 🐛　Bug Fixes

* **get-compiler-options:** fix ts `parseJsonConfigFileContent` basePath resolving ([72721a0](https://github.com/timocov/dts-bundle-generator/commit/72721a09dc4e6f1ccb31c31b8f1fe864caed1252))
* **get-compiler-options:** set ts `parseJsonConfigFileContent` basePath to be absolute ([05c3cb6](https://github.com/timocov/dts-bundle-generator/commit/05c3cb619c3a2d3cde2d8fa7e8ad025881f8e740))


### Reverts

* Revert "Fail if generated dts contains non-exported nodes which can be emitted in JS" ([e941081](https://github.com/timocov/dts-bundle-generator/commit/e941081f2f914cf951a57d2f9251cb4479b7c46a))


### 🔖　Miscellaneous

* Bumped version to 3.0.0 ([d5ab158](https://github.com/timocov/dts-bundle-generator/commit/d5ab158c450d850e964cf81ccf34a60e46ed103e))
* Updated mocha to 6.1.3 ([1301e68](https://github.com/timocov/dts-bundle-generator/commit/1301e68ac3a259d330c42da8db578aa363877df9))
* Updated yargs to latest version ([05b23f4](https://github.com/timocov/dts-bundle-generator/commit/05b23f46f25a3563e8735e3c752bca96a93510ea))
* Updated nodejs typings to the first supported (major) version (8) ([2da649f](https://github.com/timocov/dts-bundle-generator/commit/2da649f881731e7bbbbd7eb5db3ddb47079bbdd8))
* Enabled incremental TypeScript build ([a799183](https://github.com/timocov/dts-bundle-generator/commit/a799183affd29e0f55bd97bd17faad71e38f3ee6))
* Updated TypeScript to 3.4.3 ([b15f260](https://github.com/timocov/dts-bundle-generator/commit/b15f2606a0d273a14a0029e2207dd0cce00646a9))
* Updated mocha to 6 version ([1263dff](https://github.com/timocov/dts-bundle-generator/commit/1263dff237a91a444845a3909372ee9d8c27e3cc))
* Added "engines" key in package.json with nodejs >= 8 ([6e68c22](https://github.com/timocov/dts-bundle-generator/commit/6e68c2270dd5433af42200e36ad5308ae21bb327))
* Updated tslint to 5.15 ([a1ee598](https://github.com/timocov/dts-bundle-generator/commit/a1ee5983b50e77800bca4ec56d8667afdd27ae4e))
* Updated TypeScript to 3.4.1 ([c7ba2be](https://github.com/timocov/dts-bundle-generator/commit/c7ba2be8af400273687b9bf995f0878c7cb122dc))
* Added "export {};" to generated output to disable import non-exported nodes ([0e42053](https://github.com/timocov/dts-bundle-generator/commit/0e4205301f965abf999132030344a638961e707d)), closes [#81](https://github.com/timocov/dts-bundle-generator/issues/81)
* Improved error log messages (printed with red font color and added new line before error) ([6630db8](https://github.com/timocov/dts-bundle-generator/commit/6630db8c1d05cf40eb76e0d0cd5cf0a750c48eae))
* Do not use jsdoc while sorting nodes ([633f7e5](https://github.com/timocov/dts-bundle-generator/commit/633f7e552056068fa269c54925dea346a9b569fb)), closes [#23](https://github.com/timocov/dts-bundle-generator/issues/23)
* Updated TypeScript to 3.3.4000 ([db6c09c](https://github.com/timocov/dts-bundle-generator/commit/db6c09c17f8f3b237a4f422b32814fd466506f64))
* Updated TSLint to 5.14 ([5904002](https://github.com/timocov/dts-bundle-generator/commit/5904002734a6fd198aa2474568ed3a1de4378765))
* Added more logs when failOnClass error happened ([0c08e1f](https://github.com/timocov/dts-bundle-generator/commit/0c08e1f0a9ce0f81069b64a1db9ee419f397b4f1)), closes [#77](https://github.com/timocov/dts-bundle-generator/issues/77)
* Added .vscode/launch.json to gitignore ([e39f1ac](https://github.com/timocov/dts-bundle-generator/commit/e39f1acd96680c85f24358f1a46608c962cc7c63))
* Added `inline-declare-externals` CLI option to enable inlining declare module statements ([727ff72](https://github.com/timocov/dts-bundle-generator/commit/727ff72e1bdf4064c155be2851468a949d546ef2)), closes [#75](https://github.com/timocov/dts-bundle-generator/issues/75)
* Do not add "export" keyword for ambient modules ([072d3a9](https://github.com/timocov/dts-bundle-generator/commit/072d3a9385f932a5696e08824ed93d956131b021))
* Extracted isGlobalScopeAugmentation function ([a1f0b3a](https://github.com/timocov/dts-bundle-generator/commit/a1f0b3a0aa376ca9b3800bc9d23f6952d152a2a6))

# 2.1.0 "🔖　Miscellaneous" (2019-02-14)



### 🔖　Miscellaneous

* Bumped version to 2.1.0 ([a2e453e](https://github.com/timocov/dts-bundle-generator/commit/a2e453e021b98a36fbac1440600e799fb4ad3418))
* Disabled skipLibCheck while checking generated output (fixes #72) ([caf0178](https://github.com/timocov/dts-bundle-generator/commit/caf01782310f379fbb12f6ee08b4809e95f85100)), closes [#72](https://github.com/timocov/dts-bundle-generator/issues/72)
* Do not import nodes from the default library (fixes #71) ([8104fb7](https://github.com/timocov/dts-bundle-generator/commit/8104fb71d24fb50e6e5a3c96c91c4e3f600493ab)), closes [#71](https://github.com/timocov/dts-bundle-generator/issues/71)
* Removed TypesUsageEvaluator::isTypeUsedBySymbol ([992667b](https://github.com/timocov/dts-bundle-generator/commit/992667be9f6c1394d6ed87c92dc15036d2bcb20a))
* Fixed incorrect unignoring node_modules folder in tests-cases ([6754848](https://github.com/timocov/dts-bundle-generator/commit/6754848c57b394789fae75f35b7410667154ad57))
* Added assertions for not-existent input/output files in tests ([43c2774](https://github.com/timocov/dts-bundle-generator/commit/43c277476ac26b637a0e13b6aaac76866225515e))
* Removed unnecessary type assertion ([34c6cd0](https://github.com/timocov/dts-bundle-generator/commit/34c6cd0d3db91d5e0f471e2349d4b812f9234774))
* Moved isSourceFileDefaultLibrary hacks to separate function ([3619cdb](https://github.com/timocov/dts-bundle-generator/commit/3619cdbb4c444de2c58d963c7ea22d314d6379cc))
* Updated TypeScript to 3.3.1 ([cb5ef4c](https://github.com/timocov/dts-bundle-generator/commit/cb5ef4c873968c6042d090774c0ac3af71d9c6ff))
* Fixed .gitignore for .d.ts files ([71ab9b5](https://github.com/timocov/dts-bundle-generator/commit/71ab9b5d2321f47d552a9057f5bf0e70b35e3db6))
* Fixed file.exclude for vscode ([55e7964](https://github.com/timocov/dts-bundle-generator/commit/55e7964e904f3deeca209691ec57f759dab3e822))
* Updated TSLint to 5.12 ([d8c7f42](https://github.com/timocov/dts-bundle-generator/commit/d8c7f42daa3c0856a1c4f573d6a3b6ac5f43fc43))
* Enabled object-literal-shorthand tslint rule ([9a0064a](https://github.com/timocov/dts-bundle-generator/commit/9a0064a5d375189dd5b199740b16e6d05d6269be))
* Used tslint:latest as base config for tslint ([87d5894](https://github.com/timocov/dts-bundle-generator/commit/87d5894b9fd4ac880143a4f339a27ca3f6c4692a))
* Disabled redundant tslint rule "import-blacklist" ([0bd2de0](https://github.com/timocov/dts-bundle-generator/commit/0bd2de0e9afa991ad0ace443260425655e985554))
* Moved tslint config to the new format ([bbddd4a](https://github.com/timocov/dts-bundle-generator/commit/bbddd4a423fad951b9e89a31ca7cc19d93eec200))
* Replaced 4 spaces with 2 spaces in tslint.json ([5a83b9e](https://github.com/timocov/dts-bundle-generator/commit/5a83b9e18f9fc9c206feacb8a63f17328d00ef6a))
* Updated yargs to next minor version (not to the latest major) ([caf30f6](https://github.com/timocov/dts-bundle-generator/commit/caf30f6b79fc9a0d4b6abdd92af0f4c6a4ec3378))
* Added test case with custom types folder ([4e516cd](https://github.com/timocov/dts-bundle-generator/commit/4e516cd4a00bf7ea4abfa11af296efad48aeb91c))
* Added include section to tsconfig ([b31184b](https://github.com/timocov/dts-bundle-generator/commit/b31184b458700b03544068031cea49ef27242b71))
* Fixed generating path for module in Windows ([eefb116](https://github.com/timocov/dts-bundle-generator/commit/eefb1160a683ce3299c584390850112e8f822480))

# 2.0.0 "🔖　Miscellaneous" (2018-12-10)



### 🔖　Miscellaneous

* Bumped version to 2.0.0 ([75bdabb](https://github.com/timocov/dts-bundle-generator/commit/75bdabb0d1ba14ff89957c953877e1194f199886))
* Added typings field in package.json ([e127e75](https://github.com/timocov/dts-bundle-generator/commit/e127e7507853c5ea0fbdf2406e19be3cbcbeda49))
* A small improving of log messages ([661226c](https://github.com/timocov/dts-bundle-generator/commit/661226c5684a8c198c2841e8badc8fb1af3409fc))
* Used logger in CLI instead of console ([3e0ddfb](https://github.com/timocov/dts-bundle-generator/commit/3e0ddfb516d19d463e1a18e327b8447bd8d40329))
* Added `silent` CLI option to disable any logging (except errors) ([63d359c](https://github.com/timocov/dts-bundle-generator/commit/63d359c308871d832a68fdb5c255e0b5542a2ab0))
* Changed default log level to errors in the whole tool (except CLI) ([10f51a9](https://github.com/timocov/dts-bundle-generator/commit/10f51a9fc0ff21cd452904ed515c52db9caf0160))
* Added total execution time in the log ([2da49e6](https://github.com/timocov/dts-bundle-generator/commit/2da49e681035a0ad5118fbb2259c15867ddf03c3))
* Fixed bug with relative path of preferred tsconfig in config file ([b8f6a2f](https://github.com/timocov/dts-bundle-generator/commit/b8f6a2f01062e6e7e2ee0ec016a23365930aa84d))
* Added own dts to the npm package ([b7a6579](https://github.com/timocov/dts-bundle-generator/commit/b7a6579d6eda54985a8894c37206250987bad781)), closes [#49](https://github.com/timocov/dts-bundle-generator/issues/49)
* Added fixPath function fix slashes in the path of files ([5537cf0](https://github.com/timocov/dts-bundle-generator/commit/5537cf077e4e0663e318cd9318581e3546324c27))
* Fixed CLI to work with multiple entries ([a67d4ef](https://github.com/timocov/dts-bundle-generator/commit/a67d4ef75bca73d6aaabc92cf4e1637da39cc030))
* Added possibility to generate multiple bundles from one TS compilation ([92040d0](https://github.com/timocov/dts-bundle-generator/commit/92040d0ca6fac30bf265d4f0d6fd3043d388e6db))
* Updated TypeScript to 3.2.1 ([4075c8b](https://github.com/timocov/dts-bundle-generator/commit/4075c8b06b6bbbedc8528596958c2b1f3d1ff120))
* Added checking that node is exported in `export default` ES6 style ([5246b6a](https://github.com/timocov/dts-bundle-generator/commit/5246b6a263d28757a48b4285b8d6dff9cc806e19)), closes [#17](https://github.com/timocov/dts-bundle-generator/issues/17)
* Added checking that node is exported in CommonJS or ES6 style ([ebca66c](https://github.com/timocov/dts-bundle-generator/commit/ebca66cd1966641c755ba69fb6101e5b7278a870)), closes [#42](https://github.com/timocov/dts-bundle-generator/issues/42)
* Removed multiple blank lines in functional-test-cases file ([ca7842a](https://github.com/timocov/dts-bundle-generator/commit/ca7842aca16801bf39cbb5eb78e15b48b72da8cf))
* Moved all helpers into helpers folder ([92232a5](https://github.com/timocov/dts-bundle-generator/commit/92232a5ce6109cd7cfa1b0baef5141eb5928f682))
* Fixed readme ([ab98e8b](https://github.com/timocov/dts-bundle-generator/commit/ab98e8b28b74d8a8ee99e1664e6ccc206b32bb8f))
* Added unittests for node-modules-helpers ([a7158b5](https://github.com/timocov/dts-bundle-generator/commit/a7158b52f7632aa086be37548ef9571131513048))
* Renamed all-test-cases to functional-test-cases ([65fa8a9](https://github.com/timocov/dts-bundle-generator/commit/65fa8a98ba34912047b30477769b3e9e76db0786))
* Moved skippedNodes const closer to usage ([c82ea2c](https://github.com/timocov/dts-bundle-generator/commit/c82ea2c69b620b5fa73d6000032f484f5bdf9eda))
* Changed simple object to es6 Map ([0592b7b](https://github.com/timocov/dts-bundle-generator/commit/0592b7b6a80bdf77fa8720b9722c41a4e19ec811))
* Added warning about non-declaration files in the compilation ([756c99e](https://github.com/timocov/dts-bundle-generator/commit/756c99ebf2fa4962a26045367df35b5f64b3d9ec)), closes [#53](https://github.com/timocov/dts-bundle-generator/issues/53)
* Changed author name ([6736822](https://github.com/timocov/dts-bundle-generator/commit/6736822775b5e6ad6dda95515c4e58fe887527a3))
* Updated TypeScript to 3.1.6 ([2286bea](https://github.com/timocov/dts-bundle-generator/commit/2286bea2e97da3bd4cf70db113d418f386617133))
* Updated TypeScript version in .travis.yml ([844c684](https://github.com/timocov/dts-bundle-generator/commit/844c68491403c57db861f0d5d7163f6bc5c80692))

## 1.6.1 "🔖　Miscellaneous" (2018-07-31)



### 🔖　Miscellaneous

* Bumped version to 1.6.1 ([86051e2](https://github.com/timocov/dts-bundle-generator/commit/86051e248e9b1915ba83261787ac78366f6378c8))
* Updated TypeScript to 3.0.1 and unlock top version in deps ([1412ecc](https://github.com/timocov/dts-bundle-generator/commit/1412ecce452b5b1c575c6b9a4ade998f3bd53524))
* Updated TSLint to 5.11.0 ([a46826c](https://github.com/timocov/dts-bundle-generator/commit/a46826cd6ef2c5303c1002652daf463384e4f045))
* Disable some TSLint rules to satisfy it with the new TypeScript ([b7f6e9f](https://github.com/timocov/dts-bundle-generator/commit/b7f6e9f1cb2b7b0c0b8e854c35ced4338d55a1b9))
* Increase "slow" test threshold to 2.5s ([b72d3d6](https://github.com/timocov/dts-bundle-generator/commit/b72d3d613ac96541ed5b72c07a12a6ba0b2aaaf5))
* Add homepage to package.json ([db8f6d0](https://github.com/timocov/dts-bundle-generator/commit/db8f6d02129b019f8ca0d9ddcde0e95eb2d79876))
* Replace jasmine with mocha+nodejs assert ([97a7d16](https://github.com/timocov/dts-bundle-generator/commit/97a7d16123c8e07bfad1a2c482bbcb0a40822ceb))
* Add warning about enabled "skipLibCheck" compiler option while check generated dts ([bd4a011](https://github.com/timocov/dts-bundle-generator/commit/bd4a0113a43e24fe1bc3f434bf81356a309bbc11))
* Disable any logs in tests except errors ([2b9f54c](https://github.com/timocov/dts-bundle-generator/commit/2b9f54c12cdfd03146d266d76a4e46414ac23942))

# 1.6.0 "🔖　Miscellaneous" (2018-06-29)



### 🔖　Miscellaneous

* Bumped version to 1.6.0 ([982c17f](https://github.com/timocov/dts-bundle-generator/commit/982c17f2523809dcc327f283c4c79d0e360a77be))
* Add support to compile and test code with different versions of TypeScript ([cce5698](https://github.com/timocov/dts-bundle-generator/commit/cce5698a1be2fb8bdce3ac63cfda68235a9f8e5d))
* Use Program.isSourceFileDefaultLibrary to detect whether file is default library ([e387abe](https://github.com/timocov/dts-bundle-generator/commit/e387abe89f641a3de14226202c953c65bfa47f1c))
* Increase minimal supported TypeScript version to 2.6.1 ([b7e5351](https://github.com/timocov/dts-bundle-generator/commit/b7e5351754bf0cb4f6d561102535b99a5a572c14))
* Add VSCode settings ([cd6c746](https://github.com/timocov/dts-bundle-generator/commit/cd6c7462ef1bf589156b98cb5e599b183dcf9b6a))
* Grammar fixes ([95ab4d8](https://github.com/timocov/dts-bundle-generator/commit/95ab4d8c954a5fb0bb838b5fd0797142b12fd10b))
* Add issue templates ([350fd5e](https://github.com/timocov/dts-bundle-generator/commit/350fd5ea0e01565cc7b9fc185a7e53652d467680))
* Add logo ([2164ade](https://github.com/timocov/dts-bundle-generator/commit/2164ade8ba9dc5dc1f51ec682d80c4f626915a3a))

# 1.5.0 "🔖　Miscellaneous" (2018-06-22)



### 🔖　Miscellaneous

* Bumped version to 1.5.0 ([c1d7811](https://github.com/timocov/dts-bundle-generator/commit/c1d78110bb5ae7a944876b4ce38ffef8cf0dd2ce))
* Add `declare` keyword to ClassDeclaration nodes if it is not presented yet ([ce77d6e](https://github.com/timocov/dts-bundle-generator/commit/ce77d6e00c28f8a20d24a51d8ee21f34843b0e0b)), closes [#43](https://github.com/timocov/dts-bundle-generator/issues/43)
* Fix importing variables ([f349608](https://github.com/timocov/dts-bundle-generator/commit/f3496088b919c6dabd1503feab5c33d365881963)), closes [#44](https://github.com/timocov/dts-bundle-generator/issues/44)
* Travis matrix improves ([1aceb38](https://github.com/timocov/dts-bundle-generator/commit/1aceb38c3e1a79820a46fefeed10d5a834006574))
* Remove nodejs v10 from builds ([e6b9585](https://github.com/timocov/dts-bundle-generator/commit/e6b9585e081dcb30dc6c579fa43f75bc63c61c30))

# 1.4.0 "🔖　Miscellaneous" (2018-06-18)



### 🔖　Miscellaneous

* Bumped version to 1.4.0 ([cb215f7](https://github.com/timocov/dts-bundle-generator/commit/cb215f7eb4b3164508fc8117daa6193d670128b2))
* Added possibility to disable resolving symlinks to original path ([9e061ae](https://github.com/timocov/dts-bundle-generator/commit/9e061aeb76835658b75599d139952d891f1e4cf6)), closes [#39](https://github.com/timocov/dts-bundle-generator/issues/39)

# 1.3.0 "🔖　Miscellaneous" (2018-06-01)



### 🔖　Miscellaneous

* Bumped version to 1.3.0 ([b1a8562](https://github.com/timocov/dts-bundle-generator/commit/b1a85627d4eb9b7fed95a9407cb540c6111a79e4))
* Added handling reexports from entry file ([4c9b500](https://github.com/timocov/dts-bundle-generator/commit/4c9b500ffa70f97a4c911d3d253acc833428e5c3)), closes [#36](https://github.com/timocov/dts-bundle-generator/issues/36)
* Added additional information about default behavior for external-imports ([2ba1613](https://github.com/timocov/dts-bundle-generator/commit/2ba1613445af33695abafe3b1e4efd47f9e14a07))
* Fixed importing from `@types/` (wrong package name) ([92ad500](https://github.com/timocov/dts-bundle-generator/commit/92ad500ed25479024fc73ee8b3c6b4a032540cd6)), closes [#37](https://github.com/timocov/dts-bundle-generator/issues/37)

## 1.2.2 "🔖　Miscellaneous" (2018-05-25)



### 🔖　Miscellaneous

* Bumped version to 1.2.2 ([2cf57b3](https://github.com/timocov/dts-bundle-generator/commit/2cf57b3e0751d95d6ce2447f04c76f5396d2b078))
* Revert accidentally changes made by merge commit 3adab6b226eb0e757dc6d2d2c89196471e401d08 ([02b8c38](https://github.com/timocov/dts-bundle-generator/commit/02b8c38adcbe53a058f5ab71672c8b0f5bb8a855))

## 1.2.1 "🔖　Miscellaneous" (2018-05-24)



### 🔖　Miscellaneous

* Bumped version to 1.2.1 ([f750c0e](https://github.com/timocov/dts-bundle-generator/commit/f750c0ea6fa84671b7b8fb74d424088db3c92d74))
* Types from `[@types](https://github.com/types)` is not imported when Error object is introduced ([93e89ef](https://github.com/timocov/dts-bundle-generator/commit/93e89ef18d84cae339894d92f031fe9ce4a9f9bd)), closes [#35](https://github.com/timocov/dts-bundle-generator/issues/35)
* Update Travis-CI config ([e6618c7](https://github.com/timocov/dts-bundle-generator/commit/e6618c7c478ca5f98f3ac7aaef129ff5e244fd45))

# 1.2.0 "🔖　Miscellaneous" (2018-05-16)



### 🔖　Miscellaneous

* Bumped version to 1.2.0 ([0309c92](https://github.com/timocov/dts-bundle-generator/commit/0309c92f120fc388cb3c03ddb56d95749a479ff6))
* Added checking diagnostics while emitting declarations ([256d90b](https://github.com/timocov/dts-bundle-generator/commit/256d90b9f97e48e9a53e24bf298bc27ecf2ed688))
* Added checking diagnostics and `declaration` compiler option while emitting declarations ([804bc66](https://github.com/timocov/dts-bundle-generator/commit/804bc6665d3e1e0038e015cb451208e6525d8a90))
* Added cli option `--inline-declare-global` to enable inlining `declare global` statements ([e4e604b](https://github.com/timocov/dts-bundle-generator/commit/e4e604b0cfee541be969816c29f39d077508dd85)), closes [#34](https://github.com/timocov/dts-bundle-generator/issues/34)
* Fixed formatting errors ([9396063](https://github.com/timocov/dts-bundle-generator/commit/9396063ca25f6ec092bc98836783b556180d5857))
* Added handling `export =` with namespace in imported packages ([dc73f60](https://github.com/timocov/dts-bundle-generator/commit/dc73f6095ddc3e8265d94d91ce2c057c7cdcc7e5))
* Fixed multiple log message about the same import ([9d19113](https://github.com/timocov/dts-bundle-generator/commit/9d191136d22eb0a83b3a5a8a18f892c32f0a6a45))
* Extract getDeclarationForSymbol function ([71fd63c](https://github.com/timocov/dts-bundle-generator/commit/71fd63c604285a301055d1cb49720f1cc3cb7a78))
* Remove tests/test-cases/node_modules from gitignore ([7384a2c](https://github.com/timocov/dts-bundle-generator/commit/7384a2caf634258d08adc0b8b1b0211abadeee8c))
* Types from custom directory are includes in generated bundle ([8f5a0e5](https://github.com/timocov/dts-bundle-generator/commit/8f5a0e5ffaf855f0388be006f6eb6bdc08b9d333)), closes [#30](https://github.com/timocov/dts-bundle-generator/issues/30)
* Update packages ([e200607](https://github.com/timocov/dts-bundle-generator/commit/e200607dcd1c57e85488706813f0014f73c050ff))
* Used path.join instead of path.resolve and improved regex to detect ts lib file ([c601dbc](https://github.com/timocov/dts-bundle-generator/commit/c601dbc7240314b9871724ab96f16577b5fcc88d))
* Added source maps for tests and ignore it for git ([e7def63](https://github.com/timocov/dts-bundle-generator/commit/e7def63a49272b54da08dcbfa6b10e9fe0b551bb))
* Added handling `declare global` statements ([8ebefe7](https://github.com/timocov/dts-bundle-generator/commit/8ebefe7f0e56da97adcaefcaad93c558507041c3))
* extendable tsconfig is not parsed correctly ([267fb51](https://github.com/timocov/dts-bundle-generator/commit/267fb51b350924e7c3a34500af3ea64b36240f41))
* Exclude test-cases from linting ([36ada3b](https://github.com/timocov/dts-bundle-generator/commit/36ada3bdfa7bc9b8e253a497300d527095d42ee2))
* Remove `allowedTypesLibraries` from "import-from-types" config as soon it is not used ([86551cb](https://github.com/timocov/dts-bundle-generator/commit/86551cb15990a4dee9b5b821f867aba0dd2ddb8e))
* Added handling `declare module` in inlined (internal) files ([bc7e73e](https://github.com/timocov/dts-bundle-generator/commit/bc7e73e6e60b7624e70480e069b4772c2915fbb4))
* Added `declaration: true` in tsconfig for test cases ([d2c0335](https://github.com/timocov/dts-bundle-generator/commit/d2c03352be729b5f0e7e28e1956b695039270bb1))
* Added possibility to do not refer "parent" package name to get module be imported ([d4c9313](https://github.com/timocov/dts-bundle-generator/commit/d4c9313870ed8265e2c291a26c6b7151a7aca4ca))
* Added stripping export keyword for function which is not exported directly ([eac4fcd](https://github.com/timocov/dts-bundle-generator/commit/eac4fcd677c8a47caf964871e4f70e4974a9cfd4))
* Added possibility to import types for libraries declared in `declare module` ([1626cb3](https://github.com/timocov/dts-bundle-generator/commit/1626cb3afba64f6470810635977d5b6038228557))
* Extract `getActualSymbol` from anon to typescript helpers ([f2c6a31](https://github.com/timocov/dts-bundle-generator/commit/f2c6a31b78e02b218f5f17ba722006182fae266a))
* Safe refactoring ([23f78df](https://github.com/timocov/dts-bundle-generator/commit/23f78df49565834a4dcc2f065453996992abd58e))

# 1.1.0 "🔖　Miscellaneous" (2018-04-02)



### 🔖　Miscellaneous

* Bumped version to 1.1.0 ([2a6eab5](https://github.com/timocov/dts-bundle-generator/commit/2a6eab511dc3b0a028015ef5ab0a75a00751e3a7))
* Sync readme with cli ([d3efa3a](https://github.com/timocov/dts-bundle-generator/commit/d3efa3aa3bc10cde24c67f323bfcf5c4c2f11a06))
* Added `--sort` cli option ([b18edff](https://github.com/timocov/dts-bundle-generator/commit/b18edffce32df561b883b12967a1f302999e7deb)), closes [#13](https://github.com/timocov/dts-bundle-generator/issues/13)
* Added option to sort output by object's name ([25769fb](https://github.com/timocov/dts-bundle-generator/commit/25769fbb4480288995ba4d1f172180e28b18c7cb)), closes [#13](https://github.com/timocov/dts-bundle-generator/issues/13)
* Removed `output-source-file` cli option ([cb8bc98](https://github.com/timocov/dts-bundle-generator/commit/cb8bc9888846a2ff53263e994605e0c93f521b1f))
* Some imports makes adding unnecessary imports ([21abc0b](https://github.com/timocov/dts-bundle-generator/commit/21abc0b15683fc77c344381922412bfd0341fca7)), closes [#22](https://github.com/timocov/dts-bundle-generator/issues/22)
* Added test to detect that importing "compound" type makes adding unnecessary import ([b8410af](https://github.com/timocov/dts-bundle-generator/commit/b8410af5ecbb2ff53d68a2e4074eb31349397759))
* Added test for inlining libraries ([32f140a](https://github.com/timocov/dts-bundle-generator/commit/32f140a5e0f3405d2baea8dad18f94a35f318091))
* Added test for external import ([8fb03ef](https://github.com/timocov/dts-bundle-generator/commit/8fb03ef51fdd91b681a2f0ccb11cf9cca5725b65))
* Fixed path in tests/tsconfig.json ([2d192f8](https://github.com/timocov/dts-bundle-generator/commit/2d192f8200d4a8642e1cfb90f0c2938d2f4d3d20))
* Fixed grammar in README.md (synced with code) ([57d67b2](https://github.com/timocov/dts-bundle-generator/commit/57d67b2c1bdface95d9a05300166d64cbf7ae30c))

# 1.0.0 "🔖　Miscellaneous" (2018-03-08)



### 🔖　Miscellaneous

* Bumped version to 1.0.0 ([98f28a1](https://github.com/timocov/dts-bundle-generator/commit/98f28a1684367db94228f71da8ca95f2bb957a9d))
* Grammar fixes ([2100026](https://github.com/timocov/dts-bundle-generator/commit/2100026bc8bb4f405f1fe920e3b2abf35365e258))
* Added .gitattributes to detect .ts files with node shebang as TypeScript files ([bc9b355](https://github.com/timocov/dts-bundle-generator/commit/bc9b3557e9de2d09aa0147514f6f55ba8818806a))
* Moved cli (bin) to bin/dts-bundle-generator.ts ([931441b](https://github.com/timocov/dts-bundle-generator/commit/931441bf0f024ec8da94766647344d265dd9f8d9))
* Removed todo from README ([6412a23](https://github.com/timocov/dts-bundle-generator/commit/6412a230649b95bee44ed8e95819d2108e298d65)), closes [#2](https://github.com/timocov/dts-bundle-generator/issues/2)
* Handle `export default ClassName;` from root files ([75c254c](https://github.com/timocov/dts-bundle-generator/commit/75c254c084eb6a7e48d547230ffacab1c9ac4d10))
* Upgrade TypeScript to 2.5.1 (with dropping support) ([eb570a9](https://github.com/timocov/dts-bundle-generator/commit/eb570a975257e71b61db9d9787d8482e0c4a12b7))
* Change type of external-inlines, external-imports and external-types cli options ([c3d128a](https://github.com/timocov/dts-bundle-generator/commit/c3d128a284ad64c5bb5b8b7f3ab9926378802e39))
* Added possibility to specify tsconfig path ([68fd24b](https://github.com/timocov/dts-bundle-generator/commit/68fd24b970c81b498dc241a4777be81263f12e42)), closes [#14](https://github.com/timocov/dts-bundle-generator/issues/14)
* Use in tests own tsconfig instead of project's ([bd2125f](https://github.com/timocov/dts-bundle-generator/commit/bd2125f5d9f40d79e8dc3099eeee919291a91476))
* Handled export default from non-entry files ([baed619](https://github.com/timocov/dts-bundle-generator/commit/baed6192ede073c36fdb31ea886bfd3442e6821d)), closes [#15](https://github.com/timocov/dts-bundle-generator/issues/15)
* Added tests for handling `export default` from non-entry files (#15) ([5c6ab75](https://github.com/timocov/dts-bundle-generator/commit/5c6ab75349dee08f294cc811a50946c913e8e8e5)), closes [#15](https://github.com/timocov/dts-bundle-generator/issues/15)
* Added tests for `export default` in entry file ([a8e4c94](https://github.com/timocov/dts-bundle-generator/commit/a8e4c94bcb6fca1ac079f5909b84e9b15a2be797))
* Update tslint to 5.9 ([bda4a7f](https://github.com/timocov/dts-bundle-generator/commit/bda4a7f62a01c0020d5def2c49973794356c01ce))
* Improved cli interface ([79d6682](https://github.com/timocov/dts-bundle-generator/commit/79d6682726c976db9bc532ab168777af342920e6))
* Added test for strip export keyword from non-exported classes/enums (as soon it cannot be imported if it not exported explicitly) ([36ef596](https://github.com/timocov/dts-bundle-generator/commit/36ef59621eab1930ca9546470a1a74a49154f985))
* Added tests for saving jsdoc ([326690b](https://github.com/timocov/dts-bundle-generator/commit/326690bbb72d1d646f69cf777a7d54b3d21450c1))
* Removed `tslib` from deps and `importHelpers` from tsconfig ([5ad7121](https://github.com/timocov/dts-bundle-generator/commit/5ad712165af78c03e5309a112d1fc00fdc4d1ddd))
* Added tests with usage `allowedTypesLibraries` option ([57d16a1](https://github.com/timocov/dts-bundle-generator/commit/57d16a13690a1c7cabf0af1fd410372f3389e4df))
* Fixed regex to detect typescript lib file ([67d4036](https://github.com/timocov/dts-bundle-generator/commit/67d4036ea4a11e00418ac7e49648c1d4d5aca821))
* Added some tests ([c2d9298](https://github.com/timocov/dts-bundle-generator/commit/c2d929809096a8e07f43d0c40be971b62acf6905))
* Added handling CLRF in generated file to pass tests ([2976111](https://github.com/timocov/dts-bundle-generator/commit/2976111214ab5b70a8405ec67640959e0b68cd8c))
* Introduce tests ([f7c10ed](https://github.com/timocov/dts-bundle-generator/commit/f7c10ed30182601d06039de8a907919eb631a745))
* Fixed build with TypeScript 2.7 ([72a7a6e](https://github.com/timocov/dts-bundle-generator/commit/72a7a6e2bff5cfa980c8805adc9f619d2a04722f))
* Improved build scripts ([1f6ba31](https://github.com/timocov/dts-bundle-generator/commit/1f6ba3157072c64cfda0606b35498b2eee6e2c73))
* Improved cli file ([441174e](https://github.com/timocov/dts-bundle-generator/commit/441174e1d2b1c5b323df80825e771259ebf04626))
* Updated README.md with markdownlint ([8b2c97f](https://github.com/timocov/dts-bundle-generator/commit/8b2c97fb88f42c1f23350727f2009b5dd190815d))

## 0.6.1 "🔖　Miscellaneous" (2018-01-21)



### 🔖　Miscellaneous

* Bumped version to 0.6.1 ([54bdce2](https://github.com/timocov/dts-bundle-generator/commit/54bdce25349c5a1ccbffb398a06d321d15b13fe7))
* Fixed error "Identifier expected" if no UMD module name provided ([097abe3](https://github.com/timocov/dts-bundle-generator/commit/097abe34882b83c623efa4056bcc719f0bd9d70b))

# 0.6.0 "🔖　Miscellaneous" (2017-10-31)



### 🔖　Miscellaneous

* Bumped version to 0.6.0 ([a4d999e](https://github.com/timocov/dts-bundle-generator/commit/a4d999e5961d27a7488f1b4e8732568b1aff3ba3))
* Added possibility to specify UMD module name ([036164e](https://github.com/timocov/dts-bundle-generator/commit/036164e7018c0535b159f4df76ae23596a22d5d3)), closes [#12](https://github.com/timocov/dts-bundle-generator/issues/12)
* Updated README.md ([f4d0007](https://github.com/timocov/dts-bundle-generator/commit/f4d00073a292cf670e96c6427eaad310f36562aa))
* Added removing `outDir` from compiler options to generate dts without errors ([fbbe511](https://github.com/timocov/dts-bundle-generator/commit/fbbe511e9bc491e634f7d56b911e5da9e6c6bebb))

# 0.5.0 "🔖　Miscellaneous" (2017-10-16)



### 🔖　Miscellaneous

* Bumped version to 0.5.0 ([c160171](https://github.com/timocov/dts-bundle-generator/commit/c160171dc102243ca955b4efbd2d8b1cbcdaa7b0))
* Added possibility to import all external libraries (except inlined) ([11643e6](https://github.com/timocov/dts-bundle-generator/commit/11643e6a4acf1c11a19aa6184646c1a8e3a3a2a8)), closes [#6](https://github.com/timocov/dts-bundle-generator/issues/6)
* Improved checking of libraries for import/types usage (calc once for source file) ([035e9ac](https://github.com/timocov/dts-bundle-generator/commit/035e9acee0ab084a8d4d68a49aef671e78ccb5f2))
* Organized imports ([d4d8ab7](https://github.com/timocov/dts-bundle-generator/commit/d4d8ab7d7322d2324fbf892301b44378620e3a37))
* Removed external (in cli) default values for `generateDtsBundle` ([8e2d6a3](https://github.com/timocov/dts-bundle-generator/commit/8e2d6a3595199cf8903bf8d31a0addbd3ae09fb0))
* Extract some ts helpers into separate file ([af5314c](https://github.com/timocov/dts-bundle-generator/commit/af5314caeace09df29c4d47d905c7b94a02fd844))

## 0.4.1 "🔖　Miscellaneous" (2017-10-13)



### 🔖　Miscellaneous

* Bumped version to 0.4.1 ([7c4c729](https://github.com/timocov/dts-bundle-generator/commit/7c4c72920fc39ac2280c4c1e1ae0d18dc772013b))
* Not only JSDoc added to exported types [#9](https://github.com/timocov/dts-bundle-generator/issues/9) ([74f2d48](https://github.com/timocov/dts-bundle-generator/commit/74f2d48efc5f096c0c3a27e4b7547f5fb0d0dd69))

# 0.4.0 "🔖　Miscellaneous" (2017-10-13)



### 🔖　Miscellaneous

* Bumped version to 0.4.0 ([37bb353](https://github.com/timocov/dts-bundle-generator/commit/37bb35309255c620d1058cde9ee6f1be8d79e4ed))
* Updated .gitignore ([7b5a5a7](https://github.com/timocov/dts-bundle-generator/commit/7b5a5a775c54679c3075d355793b5219d59e1cc6))
* Enabled compiler strict mode ([274e9c0](https://github.com/timocov/dts-bundle-generator/commit/274e9c08ccf34817f64cd90fc7639dec105fe909))
* Fixed types to compile with ts 2.6 ([7dbdf67](https://github.com/timocov/dts-bundle-generator/commit/7dbdf6754322a70e6b76d3d0a2d74cb56f38ef57))
* Added `--external-types` cli option ([f0f3cbd](https://github.com/timocov/dts-bundle-generator/commit/f0f3cbd7d488f962f5e7c9b0513044fba0870824))
* Added generating triple-slash reference directive for libraries from `@types` ([72937ee](https://github.com/timocov/dts-bundle-generator/commit/72937ee68f519640a5f03bc619a7afc6b6d1c441)), closes [#3](https://github.com/timocov/dts-bundle-generator/issues/3)
* Added some generated by npm files to .gitignore ([471dc0d](https://github.com/timocov/dts-bundle-generator/commit/471dc0dae1d6b897241dd79dd8854d32504c6c2a))
* JSDoc of exported item does not present in output ([d7640f4](https://github.com/timocov/dts-bundle-generator/commit/d7640f41912ae16ade2af862e878c6b2166bf643)), closes [#5](https://github.com/timocov/dts-bundle-generator/issues/5)
* Added npm badge to readme ([2812073](https://github.com/timocov/dts-bundle-generator/commit/281207338110c192f69c51d616f1dbed92eeac80))
* Added Travis CI ([680ed05](https://github.com/timocov/dts-bundle-generator/commit/680ed057452e326aeeb3b5c157c409bb9476a375))
* Added tslint ([14b4c64](https://github.com/timocov/dts-bundle-generator/commit/14b4c641abc6cb3fefc4568b995c7a1a2cdad422))
* Fixed typo ([c3175ff](https://github.com/timocov/dts-bundle-generator/commit/c3175ffd23db50881847ba7ae1cbe7e42c511de5))

# 0.3.0 "🔖　Miscellaneous" (2017-10-09)



### 🔖　Miscellaneous

* Bumped version ([e54649d](https://github.com/timocov/dts-bundle-generator/commit/e54649deb5c03d5a3e1b91f1fa70a0e56f73fbb6))
* Added checking that library name exactly as provided ([cb9ee38](https://github.com/timocov/dts-bundle-generator/commit/cb9ee3892a98d0be85f935b66545e21201f715f9))
* Added emitting `import` directive for white-listed libraries ([d5ca912](https://github.com/timocov/dts-bundle-generator/commit/d5ca912744cff783f51ce9d9d35c641b12963ebd)), closes [#1](https://github.com/timocov/dts-bundle-generator/issues/1)
* Added new items to TODO ([905fdf6](https://github.com/timocov/dts-bundle-generator/commit/905fdf6844daa930ad45ddc70a66c0a61710d8f2))

## 0.2.1 "🔖　Miscellaneous" (2017-09-13)



### 🔖　Miscellaneous

* Bumped version ([fb0acc5](https://github.com/timocov/dts-bundle-generator/commit/fb0acc5774e02290e08c49d4b76fd47ee96d9ff4))
* Update tsconfig.json ([34f1ee7](https://github.com/timocov/dts-bundle-generator/commit/34f1ee77a6e1d8857bccc4ddf96d39c70bb3345b))
* Fixed mistake ([824f1e8](https://github.com/timocov/dts-bundle-generator/commit/824f1e87e3981634493729be72808946db0ffc78))
* Added converting spaces to tabs at start of line in generated file ([b9f200d](https://github.com/timocov/dts-bundle-generator/commit/b9f200d19063515496451461eeb5b5b8e25ce2b4))
* Fixed issues to compile with typescript 2.5.2 ([682cfe5](https://github.com/timocov/dts-bundle-generator/commit/682cfe50595a1ccf5ae603e646749c15cd419e3d))
* Updated tslib and @types/argparse to latest version ([9176c3d](https://github.com/timocov/dts-bundle-generator/commit/9176c3d59aba3419cadbfbbac3cad35327f59759))
* Removed package-lock.json ([2f6ef43](https://github.com/timocov/dts-bundle-generator/commit/2f6ef4363121568286ca58580a610efd1b48c180))

# 0.2.0 "🔖　Miscellaneous" (2017-07-03)



### 🔖　Miscellaneous

* Bumped version and updated readme ([831f543](https://github.com/timocov/dts-bundle-generator/commit/831f543aefed8e87899f19b521c2e69ed27c2ae2))
* Added option to specify which node_modules should be added to result file ([ffaab03](https://github.com/timocov/dts-bundle-generator/commit/ffaab03e3b319499d80f5a53fe740c070dfa9372))
* Added option to use config file ([3758468](https://github.com/timocov/dts-bundle-generator/commit/3758468f66706ef9ed5cec651efa42425e8f4b68))
* Added infinite recursion guard ([28efac5](https://github.com/timocov/dts-bundle-generator/commit/28efac5b319e572a6ba04b727c8ce25a5594b9a6))
* Added auto-generating `outFile` from input file ([a62f443](https://github.com/timocov/dts-bundle-generator/commit/a62f443b36dc6928027a8fa09eda8995eb8372d1))

## 0.1.3 "🔖　Miscellaneous" (2017-06-14)



### 🔖　Miscellaneous

* Bumped version and updated package.json ([75b8ef6](https://github.com/timocov/dts-bundle-generator/commit/75b8ef6ca44539f97966920f62b65429361bfe5b))
* Added `fail-on-class` cli option ([85195ea](https://github.com/timocov/dts-bundle-generator/commit/85195ea43c5ecfcf8200424a90f688b44a622061))

## 0.1.2 "🔖　Miscellaneous" (2017-03-15)



### 🔖　Miscellaneous

* Bump version ([7aed6ab](https://github.com/timocov/dts-bundle-generator/commit/7aed6ab04fc219dda0ff50e345050e9c5a11b55a))
* Add some info into package.json (repo, issues, etc) ([8b6857c](https://github.com/timocov/dts-bundle-generator/commit/8b6857c6c5d788c1a8483c1db6cd69a7fff95dcd))
* Update README.md ([b114df0](https://github.com/timocov/dts-bundle-generator/commit/b114df031436f2e09938904ca384d5ee767fedd4))
* Add core logic ([fc68e2c](https://github.com/timocov/dts-bundle-generator/commit/fc68e2c5ad1dbbdaf3374ff17d8d3eff0501d64b))
* Added .gitignore ([f5b1c97](https://github.com/timocov/dts-bundle-generator/commit/f5b1c97d995b604e192c55d56a27bb88662d4ed1))
* Initial commit ([fe1cf90](https://github.com/timocov/dts-bundle-generator/commit/fe1cf903da7588c89285171137b1987f9522addf))
