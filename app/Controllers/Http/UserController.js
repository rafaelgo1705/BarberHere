"use strict";

const User = use("App/Models/User");
const Role = use("Role");

class UserController {
  async register({ request, response }) {
    const data = request.only(["username", "name", "email", "password"]);
    const { role_id } = request.only(["role_id"]);

    try {
      const role = await Role.find(role_id);

      if (role) {
        const user = await User.create(data);
        await user.roles().attach([role_id]);
        return await User.query()
          .where("email", user.email)
          .with("roles", (builder) => {
            builder
              .select("id", "slug", "name")
              .with("permissions", (builder) => {
                builder.select("id", "slug", "name");
              });
          })
          .first();
      } else {
        response.status(400).send({ message: "Esta regra não existe!" });
      }
    } catch (error) {
      response.status(400).send({ message: error.code });
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all();

    try {
      const token = await auth.attempt(email, password);
      const user = await User.query()
        .where("email", email)
        .with("roles", (builder) => {
          builder
            .select("id", "slug", "name")
            .with("permissions", (builder) => {
              builder.select("id", "slug", "name");
            });
        })
        .first();
      if (!user) {
        response.status(404).send({ message: "Usuário não existe!" });
      }

      return { token, user };
    } catch (error) {
      if (error.code === "E_USER_NOT_FOUND") {
        return response
          .status(404)
          .send({ field: "username", message: "Usuário não cadastrado!" });
      }
      if (error.code === "E_PASSWORD_MISMATCH") {
        return response
          .status(401)
          .send({ feld: "password", message: "Senha incorreta!" });
      }
    }
  }

  async index({ request }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;

    const user = await User.query().paginate(page, perPage);

    return user;
  }

  async show({ params, response }) {
    const user = await User.findBy("secure_id", params.secure_id);

    if (user) {
      return user;
    } else {
      response.status(404).send({ message: "Usuário não existe!" });
    }
  }

  async update({ params, request, response }) {
    const data = request.only(["username", "name", "email"]);
    const { role_id } = request.all();

    const user = await User.findBy("secure_id", params.secure_id);

    if (user) {
      const role = await Role.find(role_id);
      if (role) {
        user.merge(data);
        await user.save();
        return user;
      } else {
        response.status(404).send({ message: "Esta regra não existe!" });
      }
    } else {
      response.status(404).send({ message: "Usuário não existe!" });
    }
  }

  async resetPassword({ params, request, response }) {
    const data = request.only(["password"]);

    const user = await User.findBy("secure_id", params.secure_id);
    if (user) {
      user.merge(data);
      await user.save();
      return user;
    } else {
      response.status(404).send({ message: "Usuário não existe!" });
    }
  }

  async inactive({ params, response }) {
    const user = await User.findBy("secure_id", params.secure_id);

    if (user) {
      user.merge({ active: "false" });
      await user.save();
      response.send({ message: "Usuário desativado!" });
    } else {
      response.status(404).send({ message: "Usuário não existe!" });
    }
  }

  async active({ params, response }) {
    const user = await User.findBy("secure_id", params.secure_id);

    if (user) {
      user.merge({ active: "true" });
      await user.save();
      response.send({ message: "Usuário ativado!" });
    } else {
      response.status(404).send({ message: "Usuário não existe!" });
    }
  }
}

module.exports = UserController;
