'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Company extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'SecureIdHook.uuid');
  }

  static get table() {
    return 'companies';
  }

  static get hidden() {
    return ['id'];
  }

  address() {
    return this.hasMany('App/Models/Company/Address');
  }
}

module.exports = Company;
