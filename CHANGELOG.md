# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.14.1] - 2019-06-28
### Fixed
- `bin.js` was not included in the package. [#17]

## [0.14.0] - 2019-04-28
### Added
- Cli

### Fixed
- Shared styles were not applied correctly [#16]
- Updated dependencies

## [0.13.0] - 2019-02-26
### Added
- New property `sketch.colorAssets` that returns the palette of colors with names
- New property `sketch.gradientAssets` that returns the palette of gradients with the names
- New function `sketch.exportPreviews()`
- New function `sketch.exportTextPreviews()`

### Removed
- The node `Attributes` was removed because starting from sketch 50 the attributes are not parsed anymore

### Fixed
- Update mocha to v6 [#13]

## [0.12.2] - 2019-01-27
### Fixed
- Removed some files included on publish the package in npm

## [0.12.1] - 2019-01-27
### Fixed
- `sketch.saveDir` can display a partially resolved promise warning

## [0.12.0] - 2019-01-15
### Added
- `sketch.load()` to load a sketch from the sources [#12]
- Added a second argument in `FileReference.export()` to change the name of the exported file [#11]

### Fixed
- Added travis for ci testing
- Fixed null values evaluated as objects

## [0.11.0] - 2018-12-24
### Changed
- `sketch.save()` and `sketch.saveDir()` returns a promise instead `this`.

### Removed
- The provided plugins are removed to keep this library simpler
- Dropped `sketch.use()`

### Fixed
- `node.get()` and `node.getAll()` does not return some recursive results
- Some classes were not instantiated recursively

## [0.10.0] - 2018-07-18
### Added
- [#7] New node `Attributes` to parse and return the attributes of text styles (read-only by now)
- Added `sketch.foreignLayerStyles`
- Added `sketch.foreignTextStyles`

### Changed
- Renamed `sketch.localSymbols` to `sketch.symbols`
- Renamed `sketch.sharedStyles` to `sketch.layerStyles`

## [0.9.0] - 2018-06-08
### Added
- New method `saveDir` to save the sketch as a directory, in order to inspect the json scheme

## [0.8.1] - 2017-11-22
### Fixed
- Infinite recursion bug resolved

## [0.8.0] - 2017-11-15
### Added
- New plugin `ImportArtboards`
- API: new method `Node.set(key, Node)`
- API: new method `Node.push(key, Node)`

## [0.7.0] - 2017-11-13
### Added
- New plugin `LocalSymbolsToLibrarySymbols`
- API: New function `Node.getSketch()` returning the sketch instance containing the node
- API: New method `Node.toJson()` returning the node as json

### Changed
- `Sketch.save` returns `this` instead a prommise

### Fixed
- Fixed `Sketch.save` combined with plugins.
- `SymbolInstance.symbolMaster` property now searches the symbolMaster in all pages instead only in Symbols page.

## 0.6.0 - 2017-10-17
Added support for libraries, introduced in sketch 47.

### Added
- New properties added to `Sketch` instance:
  - `localSymbols`: Array with all local symbols (symbols stored in any page of the document)
  - `foreignSymbols`: Array with all symbols loaded from libraries

### Changed
- Removed the docs directory from the repo (you can build using `yarn docs` or `npm run docs`)

[#7]: https://github.com/oscarotero/sketch/issues/7
[#11]: https://github.com/oscarotero/sketch/issues/11
[#12]: https://github.com/oscarotero/sketch/issues/12
[#13]: https://github.com/oscarotero/sketch/issues/13
[#16]: https://github.com/oscarotero/sketch/issues/16
[#17]: https://github.com/oscarotero/sketch/issues/17

[0.14.1]: https://github.com/oscarotero/sketch/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/oscarotero/sketch/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/oscarotero/sketch/compare/v0.12.2...v0.13.0
[0.12.2]: https://github.com/oscarotero/sketch/compare/v0.12.1...v0.12.2
[0.12.1]: https://github.com/oscarotero/sketch/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/oscarotero/sketch/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/oscarotero/sketch/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/oscarotero/sketch/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/oscarotero/sketch/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/oscarotero/sketch/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/oscarotero/sketch/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/oscarotero/sketch/compare/v0.6.0...v0.7.0
