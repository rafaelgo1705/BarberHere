'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Time extends Model {
  static get table() {
    return 'time_companies';
  }
}

module.exports = Time;
