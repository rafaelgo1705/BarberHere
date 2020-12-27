'use strict';

const Role = use('Role');

class RoleController {
  async index({ request }) {
    const page = request.get().page || 1;
    const perPage = request.get().page || 10;
    
    return await Role.query().with('permissions').paginate(page, perPage);
  }

  async show() {}

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
  }

  async update() {}

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
