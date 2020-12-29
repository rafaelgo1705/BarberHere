'use strict';

class ServProdStore {
  get rules() {
    const type = ['service', 'product'];
    const data = this.ctx.request;

    if (data.body.type === 'service') {
      return {
        type: `required|in:${type}`,
        name: 'required',
        value: 'required',
        time: 'required',
      };
    } else if (data.body.type === 'product') {
      return {
        type: `required|in:${type}`,
        name: 'required',
        value: 'required',
        measurement: 'required',
        quantity: 'required',
      };
    } else {
      return {
        type: `required|in:${type}`,
        name: 'required',
        value: 'required',
      };
    }
  }

  get messages() {
    return {
      'type.required': 'Tipo do Serviço/Produto é obrigatório!',
      'type.in': 'Tipo de Serviço/Produto inválido!',
      'name.required': 'Nome é obrigatório!',
      'value.required': 'Valor é obrigatório!',
      'time.required': 'Tempo do serviço é obrigatório!',
      'measurement.required': 'Tipo de unidade do produto é obrigatório!',
      'quantity.required': 'Quantidade do produto é obrigatório!',
    };
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = ServProdStore;
