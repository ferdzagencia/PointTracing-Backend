const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Rota para criar uma nova empresa
router.post('/create', companyController.createCompany);

// Rota para listar todas as empresas
router.get('/list', companyController.getAllCompanies);

// Rota para obter os detalhes de uma empresa específica
router.get('/:id', companyController.getCompanyById);

// Rota para atualizar uma empresa específica
router.put('/update/:id', companyController.updateCompany);

// Rota para inativar uma empresa
router.put('/inactivate/:id', companyController.inactivateCompany);

module.exports = router;
