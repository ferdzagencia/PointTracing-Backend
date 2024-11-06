const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DxfParser = require('dxf-parser');

router.post('/process-dxf', async (req, res) => {

  
  const { fileName } = req.body;

  if (!fileName) {
    console.error('Nome do arquivo não fornecido');
    return res.status(400).json({ error: 'Nome do arquivo não fornecido.' });
  }
  else {
    console.log('ENTROU AQUI - Nome do arquivo recebido:', fileName); // Adicionando log para verificar o
  }

  // Monta o caminho completo do arquivo
  const filePath = path.join(__dirname, '../uploads', fileName);

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    console.error('Arquivo não encontrado:', filePath);
    return res.status(404).json({ error: 'Arquivo não encontrado.' });
  }

  try {
    //console.log('Tentando processar o arquivo DXF:', filePath);
    const data = fs.readFileSync(filePath, 'utf8'); // Lê o arquivo DXF
    //console.log('Conteúdo do arquivo DXF:', data); // Log do conteúdo lido
    const parser = new DxfParser();
    const parsed = parser.parseSync(data); // Processa o arquivo DXF
    //console.log('Resultado do parser:', parsed); // Log do resultado do parser
    
    // Verifique se há entidades DXF sendo extraídas
    //console.log('Entidades DXF:', parsed.entities); 


    // Extrair todas as entidades e camadas
    const entities = parsed.entities; // Extrai todas as entidades
    const layers = parsed.layers; // Extrai todas as camadas

    return res.status(200).json({ 
      message: 'Arquivo processado com sucesso!', 
      data: {
        entities, // Retorna todas as entidades
        layers // Retorna todas as camadas
      }
    });

   //return res.status(200).json({ message: 'Arquivo processado com sucesso!', data: parsed });
  } catch (error) {
    console.error('Erro ao processar o arquivo DXF:', error);
    return res.status(500).json({ error: 'Erro ao processar o arquivo DXF.' });
  }
});

module.exports = router;
