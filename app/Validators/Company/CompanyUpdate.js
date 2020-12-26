'use strict';

class CompanyUpdate {
  get rules() {
    const personType = ['pf', 'pj'];
    const { secure_id } = this.ctx.params;
    return {
      person_type: `required|in:${personType}`,
      cpf_cnpj: `required|unique:companies,cpf_cnpj,secure_id,${secure_id}`,
      company_name: 'required',
      telephone1: 'required',
      email: 'required|email',
      'address.*.street': 'required',
      'address.*.number': 'required',
      'address.*.sector': 'required',
      'address.*.cep': 'required',
      'address.*.city': 'required',
      'address.*.state': 'required',
      'address.*.country': 'required',
    };
  }

  get messages() {
    return {
      'person_type.required': 'Tipo de pessoa é obrigatório!',
      'person_type.in': 'Tipo de pessoa não válido!',
      'cpf_cnpj.required': 'CPF/CNPJ é obrigatório!',
      'cpf_cnpj.unique': 'CPF/CNPJ já está cadastrado!',
      'company_name.required': 'Razão Social é obrigatório!',
      'telephone1.required': 'Telefone é obrigatório!',
      'email.required': 'E-mail é obrigatório!',
      'email.email': 'E-mail inválido!',
      'address.*.street.required': 'Rua do endereço é obrigatório!',
      'address.*.number.required': 'Número do endereço é obrigatório!',
      'address.*.sector.required': 'Bairro do endereço é obrigatório!',
      'address.*.cep.required': 'CEP do endereço é obrigatório!',
      'address.*.city.required': 'Cidade do endereço é obrigatório!',
      'address.*.state.required': 'Estado do endereço é obrigatório!',
      'address.*.country.required': 'País do endereço é obrigatório!',
    };
  }

  async fails(errorMessages) {
    const [error] = errorMessages;
    return this.ctx.response.status(406).send(error);
  }
}

module.exports = CompanyUpdate;
