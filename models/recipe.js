const knex = require('knex')({client: 'pg'})
const connection = require('../knexfile')
const { Model } = require('objection')

const knexConnection = knex(connection)

Model.knex(knexConnection)

class Recipe extends Model {
  static get tableName () {
    return 'recipes'
  }

}

module.exports = Recipe;
