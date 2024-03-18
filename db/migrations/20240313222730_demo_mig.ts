import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Users', (table) => {
    table.string('userId').primary();
    table.string('email', 255).notNullable().unique();
  });

  await knex.schema.createTable('Issues', (table) => {
    table.increments('id').primary();
    table.string('userId').references('userId').inTable('Users');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.timestamp('createdOn').defaultTo(knex.fn.now());
    table.string('status').defaultTo('pending');
    table.boolean('deleted').defaultTo(false);
    table.integer('votes').defaultTo(0); // Add this line to both the Feedback and Issues table definitions

  });

  await knex.schema.createTable('Feedback', (table) => {
    table.increments('id').primary();
    table.string('userId').references('userId').inTable('Users');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('category').notNullable();
    table.timestamp('createdOn').defaultTo(knex.fn.now());
    table.string('status').defaultTo('pending');
    table.boolean('deleted').defaultTo(false);
    table.integer('votes').defaultTo(0); // Add this line to both the Feedback and Issues table definitions

  });

  await knex.schema.createTable('Votes', (table) => {
    table.increments('vote_id').primary();
    table.string('userId').references('userId').inTable('Users');
    table.integer('requestId').notNullable();
    table.string('requestType').notNullable(); // issue or feedback
    // Ensure a composite key for unique votes per issue/feedback per user
    table.unique(['userId', 'requestId', 'requestType']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Votes');
  await knex.schema.dropTableIfExists('Feedback');
  await knex.schema.dropTableIfExists('Issues');
  await knex.schema.dropTableIfExists('Users');
}
