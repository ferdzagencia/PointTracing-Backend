const User = require('../models/User'); // O modelo de usuário
const bcrypt = require('bcryptjs');

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
  const { name, email, password, company } = req.body;

  try {
    // Verificar se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar um novo usuário
    user = new User({
      name,
      email,
      password: hashedPassword,
      company, // Associa o usuário à empresa
    });

    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('company', 'nomeFantasia'); // Popula o campo da empresa
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários', error });
  }
};

// Obter detalhes de um usuário específico
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('company', 'nomeFantasia'); // Popula o campo da empresa
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário', error });
  }
};

// Atualizar informações de um usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, company, profilePicture } = req.body;

  try {
    // Encontrar o usuário pelo ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualizar informações do usuário
    user.name = name || user.name;
    user.email = email || user.email;
    user.company = company || user.company; // Atualiza a empresa
    user.profilePicture = profilePicture || user.profilePicture; // Atualiza a foto de perfil

    await user.save();

    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

// Inativar um usuário (não deletar do banco de dados)
exports.inactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontrar o usuário pelo ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Inativar o usuário
    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'Usuário inativado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao inativar usuário', error });
  }
};
