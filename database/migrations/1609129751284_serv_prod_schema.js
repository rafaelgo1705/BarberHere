'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServProdSchema extends Schema {
  up() {
    this.create('serv_prods', table => {
      table.increments();
      table.string('secure_id').unique().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('serv_prods');
  }
}

module.exports = ServProdSchema;
