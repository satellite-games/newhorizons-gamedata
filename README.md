# @newhorizons/core

![Release builds](https://github.com/satellite-games/newhorizons-core/actions/workflows/release.yml/badge.svg)
![Quality checks](https://github.com/satellite-games/newhorizons-core/actions/workflows/main.yml/badge.svg)
![Latest Release](https://img.shields.io/github/v/release/satellite-games/newhorizons-core)

<!-- vscode-markdown-toc -->

- [Description](#Description)
- [Main Features](#MainFeatures)
  - [Constants](#Constants)
  - [Game Objects and Blueprints](#GameObjectsandBlueprints)
  - [Other Primitives](#OtherPrimitives)
  - [Contexts](#Contexts)
- [Other Features](#OtherFeatures)
  - [Localization](#Localization)
  - [Mock Data](#MockData)
- [Contributing](#Contributing)
  - [Adding new Blueprints to an existing Blueprint Collection](#AddingnewBlueprintstoanexistingBlueprintCollection)
- [License](#License)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Description'></a>Description

`@newhorizons/core` contains the source code for the @newhorizons/core JavaScript package. This is where all of the game-related magic happens. This repository contains the game framework, all of the game's in-game logic and master-data.

## <a name='MainFeatures'></a>Main Features

All of the main features are bundled into `main.js` and `main.d.ts` (types). They are available by importing from `@newhorizons/core`.

### <a name='Constants'></a>Constants

The [constants](/lib/constants/index.ts) object provides easy access to all game constants.

### <a name='GameObjectsandBlueprints'></a>Game Objects and Blueprints

The [`GameObject`](/lib/base/game-object/game-object.ts) class is the most important primitive of the game's framework. It makes up the base class for almost all other classes and objects in the game. Game Objects can have a variety of primitive features. For example, they can reference each other in a parent-children-relationship, depend on each other or modify each other's values.

In the game, `GameObject` is usually used through inheritance. The game includes a multitude of different types of `GameObject`. Those sub-classes can be found in `/lib/game-objects/` and are further categorized in different game object categories (and stored in corresponding folders):

`/lib/game-objects/character` contains Game Objects related to the [`Character`](/lib/character/character.go.ts) Game Object. `Character`s are entities that represent (mostly) player or (rarely) non-player characters in the game. They include, but are not limited to, a character's attributes, skills or traits.

The [`Blueprint`](/lib/base//game-object/types.ts) type represents a template for Game Object instantiation. Blueprints come in collections of varying sizes and make up the biggest part of the game's master data.

### <a name='OtherPrimitives'></a>Other Primitives

Besides `Game Object` there are also other primitives that make up the core parts of the game framework:

- [`Dependency`](/lib/base/dependency/dependency.ts) — Game Objects may either depend on or conflict with other game objects. Both of these relations are handled by the `Dependency` class.
- [`Modifier](/lib/base/modifier/modifier.ts) — Game Objects may come with a set of modifiers that modify other game objects. When a game object that comes with a modifier receives a new owner (e.g. a `Character`), its modifiers are applied to the owner. This system is used to e.g. apply beneficial or detrimental affects to the owner.

### <a name='Contexts'></a>Contexts

## <a name='OtherFeatures'></a>Other Features

### <a name='Localization'></a>Localization

The localization feature is bundled into `locales.js` and `locales.d.ts` (types). It is available by importing from `@newhorizons/core/locales`. This feature provides language objects that include localized values for blueprint names. You may import these objects and use them in whatever localization implementation you are using. The following language objects are available:

- `de`

### <a name='MockData'></a>Mock Data

The mock data feature is bundled into `mocks.js` and `mocks.d.ts` (types). It is available by importing from `@newhorizons/core/mocks`. This feature provides various sets of mock data and is intended for testing purposes only. These mock data sets may be less likely to change between versions than the actual game data. Using them in your tests should make it less likely for newer versions to break your tests.

## <a name='Contributing'></a>Contributing

### <a name='AddingnewBlueprintstoanexistingBlueprintCollection'></a>Adding new Blueprints to an existing Blueprint Collection

Almost all of New Horizon's game data is stored in the form of Blueprints. A Blueprint is a set of attributes that matches a specific schema. Blueprints are written in [TypeScript](https://www.typescriptlang.org/). Blueprints are stored in Blueprint Collections, which have a unique name identifying that collection (e.g. `character/skill`). Blueprints also have a unique name that extends the name of their collection (e.g. `character/skill/electronics`).

It's quite easy to add a new Blueprint to an existing collection. Simply find and open the collection you want to edit in `lib/blueprints`. and add a new element to the array. Afterwards, you should run `pnpm check` to check for any errors, including TypeScript errors. If all checks pass without errors, you can commit your change to the repository.

## <a name='License'></a>License

See [LICENSE](/LICENSE.md). If you have trouble understanding our dual-licensing system or wonder why we chose it, you may also read our explanation [here](https://github.com/satellite-games#-licensing).
