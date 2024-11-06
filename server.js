// server.js ou app.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Importar rotas de autenticação
const userRoutes = require('./routes/user'); // Importar rotas de usuários
const companyRoutes = require('./routes/companyRoutes');
const multer = require('multer'); // Importar multer
const path = require('path'); // Para trabalhar com caminhos de arquivos
const fs = require('fs'); // Para manipulação de arquivos
const dxfRoutes = require('./routes/dxfRoutes'); // Importar as rotas DXF

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Renomear o arquivo com timestamp
  },
});

const upload = multer({ storage });

// Verifica se a pasta de uploads existe, se não, cria
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Rotas
app.use('/auth', authRoutes); // Adicionar rota de autenticação/login
app.use('/api/users', userRoutes); // Prefixo para as rotas de usuário
app.use('/api/company', companyRoutes); // Adicionando as rotas de empresa

// Middleware para o processamento de arquivos
app.use('/api/dxf', dxfRoutes); // Adiciona as rotas de processamento de DXF

// Rota para upload de arquivos DXF
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('Arquivo recebido:', req.file); // Log do arquivo recebido
  if (!req.file) {
    console.error('Nenhum arquivo enviado.'); // Log de erro
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  console.log(`Arquivo ${req.file.filename} salvo com sucesso!`); // Log de sucesso
  res.status(200).send({
    message: 'Arquivo enviado com sucesso!',
    file: req.file.filename,
  });
});


// Rodar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
