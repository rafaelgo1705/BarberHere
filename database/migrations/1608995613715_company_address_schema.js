'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanyAddressSchema extends Schema {
  up() {
    this.create('company_addresses', table => {
      table.increments();
      table.string('street').notNullable();
      table.string('number').notNullable();
      table.string('complement').notNullable();
      table.string('sector').notNullable();
      table.string('cep').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('country').notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('company_addresses');
  }
}

module.exports = CompanyAddressSchema;
