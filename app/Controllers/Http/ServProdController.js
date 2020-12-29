'use strict';

const ServProd = use('App/Models/ServProd/ServProd');
const Company = use('App/Models/Company/Company');

class ServProdController {
  async index({ request, response }) {
    const page = request.get().page || 1;
    const perPage = request.get().perPage || 10;
    const company_id = request.get().company_id || null;

    if (company_id) {
      const company = await Company.findBy('secure_id', company_id);
      if (company) {
        return await ServProd.query()
          .where('company_id', company.id)
          .with('company')
          .paginate(page, perPage);
      } else {
        response.status(404).send({ message: 'Esta empresa não existe!' });
      }
    } else {
      return await ServProd.query().with('company').paginate(page, perPage);
    }
  }

  async show({ params, response }) {
    const servProd = await ServProd.query()
      .where('secure_id', params.secure_id)
      .with('company')
      .first();

    if (servProd) {
      return servProd;
    } else {
      response.status(404).send({ message: 'Serviço/Produto não existe!' });
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'type',
      'name',
      'measurement',
      'time',
      'value',
      'quantity',
    ]);
    const { company_id } = request.only(['company_id']);

    const company = await Company.findBy('secure_id', company_id);

    if (company) {
      const servProd = await ServProd.create({
        ...data,
        company_id: company.id,
      });
      return await ServProd.query()
        .with('company')
        .where('id', servProd.id)
        .first();
    } else {
      response.status(404).send({ message: 'Esta empresa não existe!' });
    }
  }

  async update({ params, request, response }) {
    const data = request.only([
      'type',
      'name',
      'measurement',
      'time',
      'value',
      'quantity',
    ]);

    const servProd = await ServProd.query()
      .where('secure_id', params.secure_id)
      .with('company')
      .first();

    if (servProd) {
      servProd.merge(data);
      await servProd.save();
      return await ServProd.query()
        .with('company')
        .where('id', servProd.id)
        .first();
    } else {
      response.status(404).send({ message: 'Serviço/Produto não existe!' });
    }
  }

  async active({ params, response }) {
    const servProd = await ServProd.query()
      .where('secure_id', params.secure_id)
      .first();

    if (servProd) {
      if (servProd.active === true) {
        response.status(406).send({ message: 'Serviço/Produto já ativo!' });
      } else {
        servProd.merge({ active: true });
        await servProd.save();
        return response.send({ message: 'Serviço/Produto ativo!' });
      }
    } else {
      response.status(404).send({ message: 'Serviço/Produto não existe!' });
    }
  }

  async inactive({ params, response }) {
    const servProd = await ServProd.query()
      .where('secure_id', params.secure_id)
      .first();

    if (servProd) {
      if (servProd.active === false) {
        response
          .status(406)
          .send({ message: 'Serviço/Produto já desativado!' });
      } else {
        servProd.merge({ active: false });
        await servProd.save();
        return response.send({ message: 'Serviço/Produto desativado!' });
      }
    } else {
      response.status(404).send({ message: 'Serviço/Produto não existe!' });
    }
  }
}

module.exports = ServProdController;
