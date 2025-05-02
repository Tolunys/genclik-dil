// server.js

// 1) Ortam değişkenlerini yükle
require('dotenv').config();

// 2) Gerekli modüller
const express = require('express');
const path    = require('path');

// 3) Express uygulamasını yarat
const app = express();

// 4) PORT değerini al (Railway atar, yoksa 3000)
const PORT = process.env.PORT || 3000;

// 5) Middleware’ler
app.use(express.static(path.join(__dirname)));

// 6) Ana sayfayı sun
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 7) Hata yakalama middleware’i
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 8) Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

