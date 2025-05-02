// server.js dosyanızda
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 3000; // Railway kendi PORT'unu verir
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello from Gençlik Dil!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});


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
