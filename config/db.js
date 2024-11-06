const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Conectando ao MongoDB com a URI:', process.env.MONGODB_URI);

        // Remova as opções obsoletas
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB', error);
        process.exit(1); // Termina o processo com um erro
    }
};

module.exports = connectDB;
