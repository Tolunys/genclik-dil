// server.js dosyanızda
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Root endpoint ekleyin - ÇOK ÖNEMLİ!
app.get('/', (req, res) => {
  res.status(200).send('Uygulama çalışıyor!');
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Diğer route'larınız...

// Uygulama başlatma
app.listen(PORT, '0.0.0.0', () => {  // '0.0.0.0' önemli!
  console.log(`Server is running on port ${PORT}`);
});
