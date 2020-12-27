'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanySchema extends Schema {
  up() {
    this.create('companies', table => {
      table.increments();
      table.string('secure_id').notNullable().unique();
      table.enum('person_type', ['pf', 'pj']).notNullable();
      table.string('cpf_cnpj').notNullable().unique();
      table.string('company_name').notNullable();
      table.string('fantasy_name');
      table.string('telephone1').notNullable();
      table.string('telephone2');
      table.string('email').notNullable();
      table.string('obs');
      table.boolean('active').default(true).notNullable();
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompanySchema;
