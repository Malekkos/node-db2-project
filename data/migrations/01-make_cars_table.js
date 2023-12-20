exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", table => {
    table.increments("id")
    table.string("vin", 17).notNullable().unique()
    table.string("make", 100).notNullable()
    table.string("model", 100).notNullable()
    table.integer("mileage", 999999).notNullable()
    table.string("title", 100)
    table.string("transmission", 100)
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars")
};
