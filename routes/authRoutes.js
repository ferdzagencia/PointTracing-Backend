const express = require('express');
const { registerUser, login } = require('../controllers/authController'); // Desestruture ambas as funções
const router = express.Router();

// Rota para registro
//router.post('/register', registerUser); // Agora está usando registerUser corretamente

// Rota para login
router.post('/login', login); // Agora está usando login corretamente

module.exports = router;
