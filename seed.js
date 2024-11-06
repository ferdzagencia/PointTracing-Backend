const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Ajuste o caminho conforme a estrutura do seu projeto

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('MongoDB connection failed', err));

// Usuários para teste
const users = [
    {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '123456', // Lembre-se de usar hash para senhas em produção
    },
    {
        name: 'Maria Oliveira',
        email: 'maria@example.com',
        password: 'abcdef', // Lembre-se de usar hash para senhas em produção
    },
    {
        name: 'Pedro Santos',
        email: 'pedro@example.com',
        password: 'password123', // Lembre-se de usar hash para senhas em produção
    },
];

// Função para inserir os usuários
const seedUsers = async () => {
    await User.deleteMany({}); // Limpar a coleção antes de adicionar novos usuários
    await User.insertMany(users);
    console.log('Usuários inseridos com sucesso');
    mongoose.connection.close(); // Fechar a conexão após a inserção
};

// Executar a função
seedUsers();
