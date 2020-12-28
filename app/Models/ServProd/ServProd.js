'use strict';

const Model = use('Model');

class ServProd extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'SecureIdHook.uuid');
  }

  static get table() {
    return 'serv_prods';
  }

  static get hidden() {
    return ['id'];
  }
}

module.exports = ServProd;
