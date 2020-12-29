'use strict';

class ServProdStore {
  get rules() {
    return {};
  }

  get messages() {
    return {};
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = ServProdStore;
