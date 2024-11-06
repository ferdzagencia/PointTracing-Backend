const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

// Criar uma nova empresa
exports.createCompany = async (req, res) => {
  const { razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, responsavel, emailCorporativo, telefoneComercial, enderecoComercial, cep, senha } = req.body;

  try {
    // Verificar se o CNPJ já existe
    const existingCompany = await Company.findOne({ cnpj });
    if (existingCompany) {
      return res.status(400).json({ message: 'CNPJ já registrado' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Criar uma nova empresa
    const newCompany = new Company({
      razaoSocial,
      nomeFantasia,
      cnpj,
      inscricaoEstadual: inscricaoEstadual || null, // Permitir que a inscrição estadual seja opcional
      responsavel,
      emailCorporativo,
      telefoneComercial,
      enderecoComercial,
      senha: hashedPassword, // Lembre-se de implementar hash da senha mais tarde
      cep,
    });

    await newCompany.save();
    res.status(201).json({ message: 'Empresa criada com sucesso', company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar empresa', error });
  }
};

// Listar todas as empresas
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter empresas', error });
  }
};

// Obter detalhes de uma empresa específica
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter empresa', error });
  }
};

// Atualizar uma empresa
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { razaoSocial, nomeFantasia, responsavel, emailCorporativo, telefoneComercial, enderecoComercial, cep } = req.body;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    // Atualizar informações da empresa
    company.razaoSocial = razaoSocial || company.razaoSocial;
    company.nomeFantasia = nomeFantasia || company.nomeFantasia;
    company.responsavel = responsavel || company.responsavel;
    company.emailCorporativo = emailCorporativo || company.emailCorporativo;
    company.telefoneComercial = telefoneComercial || company.telefoneComercial;
    company.enderecoComercial = enderecoComercial || company.enderecoComercial;
    company.cep = cep || company.cep;

    await company.save();
    res.status(200).json({ message: 'Empresa atualizada com sucesso', company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar empresa', error });
  }
};

// Inativar uma empresa
exports.inactivateCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    company.ativo = false;
    await company.save();

    res.status(200).json({ message: 'Empresa inativada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao inativar empresa', error });
  }
};
