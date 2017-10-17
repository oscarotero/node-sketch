# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.0 - UNRELEASED

First stable version, trying to fulfill the following goals:

* Provide a simple but powerful API to find, edit and remove elements.
* Create a basic structure that can be easy to extend with extra features over time.
* Some basic plugins.
* Fast and reliable.

## 0.6.0 - 2017-10-17

Added support for libraries, introduced in sketch 47.

### Added

* New properties added to `Sketch` instance:
  * `localSymbols`: Array with all local symbols (symbols stored in any page of the document)
  * `foreignSymbols`: Array with all symbols loaded from libraries

### Changed

* Removed the docs directory from the repo (you can build using `yarn docs` or `npm run docs`)
