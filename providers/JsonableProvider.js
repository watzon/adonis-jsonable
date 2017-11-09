'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class JsonableProvider extends ServiceProvider {
  register () {
    const Jsonable = require('../src/Traits/Jsonable')
    this.app.bind('Adonis/Traits/Jsonable', () => new Jsonable)
    this.app.alias('Adonis/Traits/Jsonable', 'Jsonable')
  }

  boot () {
    
  }
}

module.exports = JsonableProvider