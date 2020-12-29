'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServProdSchema extends Schema {
  up() {
    this.create('serv_prods', table => {
      table.increments();
      table.string('secure_id').unique().notNullable();
      table.string('type', ['product', 'service']).notNullable();
      table.string('name').notNullable();
      table.string('time');
      table.string('measurement');
      table.string('value').notNullable();
      table.boolean('active').default(true).notNullable();
      table
        .integer('company_id')
        .references('id')
        .inTable('companies')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('serv_prods');
  }
}

module.exports = ServProdSchema;
