exports.up = async function(knex) {
  await knex.schema.createTable("recipes", table => {
    table.increments("id");
    table.string("name").notNull();
  });
  await knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.string("name").notNull();
    table.integer("quantity").notNull();
    table.onDelete("SET NULL");
  });
  await knex.schema.createTable("recipe_ingredients", table => {
    table
      .integer("recipe_id")
      .references("id")
      .inTable("recipes");
    table
      .integer("ingredient_id")
      .reference("id")
      .inTable("ingredients");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("recipe_ingredients");
  await knex.schema.dropTableIfExists("ingredients");
  await knex.schema.dropTableIfExists("recipes");
};
