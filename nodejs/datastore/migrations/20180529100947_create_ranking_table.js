exports.up = function(knex, Promise) {
    return Promise.resolve(
        knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.boolean('baile').notNullable();
            table.boolean('cultura').notNullable();
            table.boolean('deporte').notNullable();
            table.boolean('comida').notNullable();
            table.boolean('aventura').notNullable();
        })
    );
};

exports.down = function(knex, Promise) {
    return Promise.resolve(knex.schema.dropTable('users'));
};
