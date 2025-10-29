# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2025-10-29

### Added

- Added & updated Weblate translations

### Changed

- Updated dependencies in package.json

## [1.3.0] - 2025-04-28

### Added

- Added & updated Weblate translations

### Changed

- Updated dependencies in package.json
- Fixed webpack configuration for process/browser.js
- Re-resolved and re-locked all npm dependencies in package-lock.json

## [1.2.0] - 2024-10-09

### Added

- Added & updated Weblate translations

### Changed

- Migrated to FontAwesome v6
- Improved fields error feedback in ConfigurationForm component
- Refactored Nextcloud component to include external storage setup instructions

## [1.1.0] - 2024-07-02

### Changed

- Updated .gitignore to exclude .ruff_cache/ folder
- Updated dependencies in package.json
- Updated Foris JS library to v6.0.2
- Fixed misspelled word in NextCloud intro description
- NPM audit fix

## [1.0.1] - 2024-05-20

### Changed

- Fixed wrong version in pyproject.toml

## [1.0.0] - 2024-03-12

### Added

- Added & updated Weblate translations
- Added installation of foris-controller module
- Added missing venv steps in translations section in Makefile

### Changed

- Updated dependencies in package.json
- Updated Node.js to v21.x in Makefile
- Updated ESLint and Prettier configurations
- Updated .gitignore to exclude minified JS files and license files
- Updated webpack.config.js with process/browser alias
- Updated CI to use shared scripts, build and publish python package
- Replaced Pylint & Pycodestyle for Ruff
- Changed build system to Hatch
- NPM audit fix

### Removed

- Removed MANIFEST.in

## [0.1.0] - 2022-10-25

- Add & update translations
- Fix path to static files in MANIFEST.in (icon)
- Fix path to NextCloud translations in Makefile

## [0.0.1] - 2022-09-26

- Add initial Nextcloud plugin

[unreleased]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.4.0...master
[1.4.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.3.0...v1.4.0
[1.3.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.2.0...v1.3.0
[1.2.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.1.0...v1.2.0
[1.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.0.1...v1.1.0
[1.0.1]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.0.0...v1.0.1
[1.0.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v1.0.0...v1.1.0
[0.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/compare/v0.0.1...v0.1.0
[0.0.1]: https://gitlab.nic.cz/turris/reforis/reforis-nextcloud/-/tags/v0.0.1
