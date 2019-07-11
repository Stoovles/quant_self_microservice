
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('recipes', function(table) {
      table.increments('id').primary();
      table.string('foodType');
      table.string('recipeName');
      table.integer('calories');
      table.string('recipeUrl');
      table.text('ingredientList');
      table.string('yield');
      table.string('dietLabels')
      table.string('healthLabels')
      table.float('fatQuantity')
      table.float('carbQuantity')
      table.float('sugarQuantity')
      table.float('proteinQuantity')
      table.float('totalWeight')
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
};
