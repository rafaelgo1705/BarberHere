'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('secure_id').notNullable().unique();
      table.string('username', 80).notNullable().unique();
      table.string('name').notNullable();
      table.boolean('active').default(true).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
