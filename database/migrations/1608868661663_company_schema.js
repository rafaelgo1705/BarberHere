"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanySchema extends Schema {
  up() {
    this.create("companies", (table) => {
      table.increments();
      table.string("secure_id").notNullable().unique();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("companies");
  }
}

module.exports = CompanySchema;
