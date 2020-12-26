'use strict';

const Company = use('App/Models/Company/Company');
const CompanyAddress = use('App/Models/Company/Address');

class CompanyController {
  async index({ request }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;

    return Company.query().with('address').paginate(page, perPage);
  }

  async show({ params, response }) {
    const company = await Company.query()
      .where('secure_id', params.secure_id)
      .with('address')
      .first();

    if (company) {
      return company;
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  async store({ request, auth }) {
    const data = request.only([
      'person_type',
      'cpf_cnpj',
      'company_name',
      'fantasy_name',
      'telephone1',
      'telephone2',
      'email',
      'obs',
    ]);
    const { address: dataAddress } = request.only(['address']);

    const company = await Company.create({ ...data, user_id: auth.user.id });

    dataAddress.map(async item => {
      return await CompanyAddress.create({ ...item, company_id: company.id });
    });

    return await Company.query()
      .where('id', company.id)
      .with('address')
      .first();
  }

  async update() {}

  async inactive() {}

  async active() {}
}

module.exports = CompanyController;
