'use strict';

const Model = use('Model');

class Address extends Model {
  static get table() {
    return 'company_addresses';
  }
}

module.exports = Address;
