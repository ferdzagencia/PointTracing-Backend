const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para criar um novo usuário
router.post('/register', userController.registerUser);

// Rota para listar todos os usuários
router.get('/list', userController.getAllUsers);

// Rota para obter detalhes de um usuário específico
router.get('/:id', userController.getUserById);

// Rota para atualizar um usuário específico
router.put('/update/:id', userController.updateUser); // Esta linha deve estar presente

// Rota para inativar um usuário
router.put('/inactivate/:id', userController.inactivateUser);

module.exports = router;
