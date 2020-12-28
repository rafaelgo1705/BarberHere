'use strict';

class RoleUpdate {
  get rules() {
    const { id } = this.ctx.params;
    return {
      name: `required|unique:roles,name,id,${id}`,
      description: 'required',
      permissions: 'required',
      'permissions.*.permission_id': 'required',
    };
  }

  get messages() {
    return {
      'name.required': 'Nome é obrigatório!',
      'name.unique': 'Nome de Regra já existe!',
      'description.required': 'Descrição é obrigatória!',
      'permissions.required': 'Defina as permissões para esta regra!',
      'permissions.*.permission_id.required':
        'Preencha corretamente as regras!',
    };
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = RoleUpdate;
