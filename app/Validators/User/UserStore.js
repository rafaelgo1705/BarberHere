"use strict";

class UserStore {
  get rules() {
    return {
      name: "required",
      username: "required",
      email: "required",
      password: "required",
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
      "password.required": "Senha é obrigatório!",
      "role_id.required": "Defina uma regra!",
    };
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = UserStore;
