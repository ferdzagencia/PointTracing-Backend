const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  razaoSocial: {
    type: String,
    required: true,
    trim: true,
  },
  nomeFantasia: {
    type: String,
    required: true,
    trim: true,
  },
  cnpj: {
    type: String,
    required: true,
    unique: true,
  },
  inscricaoEstadual: {
    type: String,
    unique: true, // Único, mas não obrigatório
    sparse: true, // Permite que o campo seja único, mesmo que vazio
  },
  responsavel: {
    type: String,
    required: true,
    trim: true,
  },
  emailCorporativo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  telefoneComercial: {
    type: String,
    required: true,
  },
  enderecoComercial: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: false },
  },
  senha: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
