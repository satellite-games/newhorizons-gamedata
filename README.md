# @newhorizons/core

![Release builds](https://github.com/satellite-games/newhorizons-core/actions/workflows/release.yml/badge.svg)
![Quality checks](https://github.com/satellite-games/newhorizons-core/actions/workflows/main.yml/badge.svg)
![Latest Release](https://img.shields.io/github/v/release/satellite-games/newhorizons-core)
![License](https://img.shields.io/github/license/satellite-games/newhorizons-core)

## Description

`@newhorizons/core` contains a selection of core utilities that I keep reusing across my web projects. The package aims to support single-page applications or other forms of browser-side code.

## Contributing

### Blueprints

Almost all of New Horizon's game data is stored in the form of Blueprints. A Blueprint is a set of attributes that matches a specific schema. Blueprints are written in [TypeScript](https://www.typescriptlang.org/). Blueprints are stored in Blueprint Collections, which have a unique name identifying that collection (e.g. `character/skill`). Blueprints also have a unique name that extends the name of their collection (e.g. `character/skill/electronics`).

#### Adding new Blueprints to an existing Blueprint Collection

It's quite easy to add a new Blueprint to an existing collection. Simply find and open the collection you want to edit in `lib/blueprints`. and add a new element to the array. Afterwards, you should run `pnpm check` to check for any errors, including TypeScript errors. If all checks pass without errors, you can commit your change to the repository.
