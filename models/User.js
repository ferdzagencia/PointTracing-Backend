const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Usuário ativo por padrão
  },
  profilePicture: {
    type: String, // Armazenará o caminho ou URL da foto do perfil
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Referencia o modelo de Company
    default: null, // Por padrão, um usuário pode não estar associado a uma empresa
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
