'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class JsonableProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Traits/Jsonable', () => require('../src/Traits/Jsonable'))
    this.app.alias('Adonis/Traits/Jsonable', 'Jsonable')
  }

  boot () {
    
  }
}

module.exports = JsonableProvider