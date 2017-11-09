# adonis-jsonable

The `Jsonable` trait solves a major problem that you may run into if you plan on using Postgres' JSON type in your Lucid models. Currently [knex.js][1], which Adonis uses to handle database queries, requires that JSON be stringified before being sent to the database.

This means that if you want to store an array or a JSON object in the database you have to call `JSON.stringify` on it each time. Unfortunately that also means that when persisting a model to the database with something like this

```js
let user = User.create({ name: "Bob", petnames: JSON.stringify(["Rex", "Francis", "Snuffles"]) })
```

`user.petnames` is going to be the stringified array, even though in the database it is seen as an array. This is not ideal, especially if you're creating an API and planning on sending the newly created model to a user.

## What this Trait does

The `Jsonable` trait solves this issue by allowing you to specify a list of `jsonFields` in your Model which will be automatically stringified before the model is saved, and then after the model is saved those same fields will be converted back to their original state.

## Example Usage

First install this package

```bash
adonis install adonis-jsonable
# or
npm install --save adonis-jsonable
# or
yarn add adonis-jsonable
```

Add the JsonableProvider to your `start/app.js` file

```js
const providers = [
  ...
  'adonis-jsonable/providers/JsonableProvider',
]
```

Then load the provider into your model and tell it what attributes should be `Jsonable`

```js
'use strict'

const Model = use('Model')

class User extends Model {

    get jsonFields () {
        return [ 'pets' ]
    }

    static boot () {
        super.boot()
        this.addTrait('@provider:Jsonable')
    }

}

module.exports = User

```

If you don't want to create a `jsonFields` getter you can also add the fields you want to be `Jsonable` as the second parameter in `this.addTrait`

```js
this.addTrait('@provider:Jsonable', [ 'pets' ])
```

## Changelog

### v0.1.0
- Initial release

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2017 Chris Watson <chris@watzon.me>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.

[1]: http://knexjs.org
