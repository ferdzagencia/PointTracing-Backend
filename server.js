const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/user'); 
const companyRoutes = require('./routes/companyRoutes');
const multer = require('multer'); 
const path = require('path'); 
const fs = require('fs'); 
const dxfRoutes = require('./routes/dxfRoutes'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/dxf', dxfRoutes);

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.status(200).send({
    message: 'Arquivo enviado com sucesso!',
    file: req.file.filename,
  });
});

// Vercel requer um handler para funções serverless
module.exports = app;
