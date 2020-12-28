'use strict';

const Model = use('Model');

class PermissionRole extends Model {
  static get table() {
    return 'permission_role';
  }
}

module.exports = PermissionRole;
