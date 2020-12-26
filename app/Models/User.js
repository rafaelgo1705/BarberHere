'use strict';

const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
    this.addHook('beforeCreate', 'SecureIdHook.uuid');
  }

  static get hidden() {
    return ['password', 'id'];
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
    ];
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
