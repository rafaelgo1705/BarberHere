'use strict';

const Company = use('App/Models/Company/Company');
const CompanyAddress = use('App/Models/Company/Address');
const CompanyTime = use('App/Models/Company/Time');

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

    let addressData = Promise.all(
      dataAddress.map(async item => {
        return await CompanyAddress.create({ ...item, company_id: company.id });
      })
    ).then(result => {
      return result;
    });

    if (await addressData) {
      return await Company.query()
        .where('id', company.id)
        .with('address')
        .first();
    }
  }

  async update({ params, request, response }) {
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

    const company = await Company.findBy('secure_id', params.secure_id);

    if (company) {
      company.merge(data);
      await company.save();

      let addressData = Promise.all(
        dataAddress.map(async item => {
          if (item.id) {
            const companyAddress = await CompanyAddress.find(item.id);
            companyAddress.merge(item);
            await companyAddress.save();
            return companyAddress;
          } else {
            return await CompanyAddress.create({
              ...item,
              company_id: company.id,
            });
          }
        })
      ).then(result => {
        return result;
      });

      if (await addressData) {
        return await Company.query()
          .where('id', company.id)
          .with('address')
          .first();
      }
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  async inactive({ params, response }) {
    const company = await Company.findBy('secure_id', params.secure_id);
    if (company) {
      if (company.active === false) {
        response
          .status(406)
          .send({ message: 'Esta empresa já está desativada!' });
      } else {
        company.merge({ active: false });
        await company.save();
        response.send({ message: 'Empresa desativada!' });
      }
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  async active({ params, response }) {
    const company = await Company.findBy('secure_id', params.secure_id);
    if (company) {
      if (company.active === true) {
        response.status(406).send({ message: 'Esta empresa já está ativa!' });
      } else {
        company.merge({ active: true });
        await company.save();
        response.send({ message: 'Empresa ativada!' });
      }
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  // COMPANY TIME
  async storeTime({ response, request }) {
    const data = request.only([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
      'days_exception',
    ]);

    const { company_id } = request.only(['company_id']);

    const company = (await Company.findBy('secure_id', company_id)) || null;
    if (company) {
      return await CompanyTime.create({
        ...data,
        company_id: company.id,
      });
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  async showTime({ response, request }) {
    const company_id = request.get().company_id || null;

    const company = (await Company.findBy('secure_id', company_id)) || null;

    if (company) {
      const companyTime =
        (await CompanyTime.findBy('company_id', company.id)) || null;
      if (companyTime) {
        return await companyTime;
      } else {
        response.status(404).send({ message: 'Nenhum horário cadastrado!' });
      }
    } else {
      response.status(404).send({ message: 'Empresa não existe!' });
    }
  }

  async updateTime({ params, response, request }) {
    const data = request.only([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
      'days_exception',
    ]);
    const companyTime = (await CompanyTime.find(params.id)) || null;
    if (companyTime) {
      companyTime.merge(data);
      await companyTime.save();
      return companyTime;
    } else {
      response.status(404).send({ message: 'Nenhum horário encontrado!' });
    }
  }

  async deleteTime({ params, response }) {
    const companyTime = (await CompanyTime.find(params.id)) || null;
    if (companyTime) {
      await companyTime.delete();
      response.send({ message: 'Horário apagado!' });
    } else {
      response.status(404).send({ message: 'Nenhum horário encontrado!' });
    }
  }
}

module.exports = CompanyController;
