"use strict";

const User = use("App/Models/User");

class UserController {
  async register({ request }) {
    const data = request.only(["username", "name", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async login() {}

  async index() {}

  async show() {}

  async store() {}

  async update() {}

  async delete() {}
}

module.exports = UserController;
