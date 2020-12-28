'use strict';

const Role = use('Role');
const PermissionRole = use('App/Models/User/PermissionRole');

class RoleController {
  async index({ request }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;
    const listAll = request.get().listAll || null;

    const role = Role.query().with('permissions');

    if (listAll === 'true') {
      return await role.fetch();
    } else {
      return await role.paginate(page, perPage);
    }
  }

  async show({ params, response }) {
    const role = await Role.query()
      .where('id', params.id)
      .with('permissions')
      .first();

    if (role) {
      return role;
    } else {
      response.status(404).send({ message: 'Regra não existe!' });
    }
  }

  async store({ request }) {
    const { name, description, permissions } = request.only([
      'name',
      'description',
      'permissions',
    ]);

    const role = new Role();
    role.name = name;
    role.slug = this.slugfy(name);
    role.description = description;

    await role.save();

    let permis = permissions.map(item => {
      return item.permission_id;
    });

    await role.permissions().attach(permis);
    return await Role.query().where('id', role.id).with('permissions').first();
  }

  async update({ params, request, response }) {
    const { name, description, permissions } = request.only([
      'name',
      'description',
      'permissions',
    ]);

    const role = await Role.query()
      .where('id', params.id)
      .with('permissions')
      .first();

    if (role) {
      await PermissionRole.query().where('role_id', role.id).delete();

      let permis = Promise.all(
        permissions.map(async item => {
          return await role.permissions().attach(item.permission_id);
        })
      ).then(result => {
        return result;
      });

      role.merge({ name, description, slug: this.slugfy(name) });
      await role.save();
      if (await permis) {
        return await Role.query()
          .where('id', role.id)
          .with('permissions')
          .first();
      }
    } else {
      response.status(404).send({ message: 'Regra não existe!' });
    }
  }

  async destroy({ params, response }) {
    const role = await Role.find(params.id);

    if (role) {
      await role.delete();
      response.send({ message: 'Regra deletada!' });
    } else {
      response.status(404).send({ message: 'Regra não existe!' });
    }
  }

  slugfy(str) {
    var map = {
      _: ' ',
      a: 'á|à|ã|â|À|Á|Ã|Â',
      e: 'é|è|ê|É|È|Ê',
      i: 'í|ì|î|Í|Ì|Î',
      o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      c: 'ç|Ç',
      n: 'ñ|Ñ',
    };

    for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern).toLowerCase();
    }

    return str;
  }
}

module.exports = RoleController;
