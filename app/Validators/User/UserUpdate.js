"use strict";

class UserUpdate {
  get rules() {
    const { secure_id } = this.ctx.params;
    return {
      name: "required",
      username: `required|unique:users,username,secure_id,${secure_id}`,
      email: `required|email|unique:users,email,secure_id,${secure_id}`,
      role_id: "required",
    };
  }

  get messages() {
    return {
      "name.required": "Nome é obrigatório!",
      "username.required": "Nome de Usuário é obrigatório!",
      "username.unique": "Nome de Usuário já está sendo utilizado!",
      "email.required": "E-mail é obrigatório!",
      "email.email": "E-mail inválido!",
      "email.unique": "E-mail já está sendo utilizado!",
      "role_id.required": "Defina uma regra!",
    };
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = UserUpdate;
