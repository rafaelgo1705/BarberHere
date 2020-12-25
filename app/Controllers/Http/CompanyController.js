"use strict";

const Company = use("App/Models/Company/Company");

class CompanyController {
  async index({ request }) {
    return Company.all();
  }

  async show() {}

  async store({ request }) {
    const data = request.only(["name"]);

    return await Company.create(data);
  }

  async update() {}

  async inactive() {}

  async active() {}
}

module.exports = CompanyController;
