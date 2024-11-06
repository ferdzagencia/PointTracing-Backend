const User = require('../models/User'); // O modelo de usuário
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    // Verifique se o JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'Segredo JWT não definido' });
    }

    // Cria um token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Define o tempo de expiração do token
    );

    // Retorna o token e as informações do usuário (exceto a senha)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        status: user.status // Caso tenha status (ativo/inativo)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// Exporte a função
module.exports = { login };
