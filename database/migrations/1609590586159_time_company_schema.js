'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TimeCompanySchema extends Schema {
  up() {
    this.create('time_companies', table => {
      table.increments();
      table.text('monday');
      table.text('tuesday');
      table.text('wednesday');
      table.text('thursday');
      table.text('friday');
      table.text('saturday');
      table.text('sunday');
      table.text('days_exception');
      table
        .integer('company_id')
        .unique()
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('time_companies');
  }
}

module.exports = TimeCompanySchema;
