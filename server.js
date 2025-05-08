// server.js

// 1) Ortam değişkenlerini yükle
require('dotenv').config();

// 2) Gerekli modüller
const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

=======
const path    = require('path');

// 3) Express uygulamasını yarat
>>>>>>> 05591bd354cf335f60920db657cc9acce50384ef
const app = express();

// 4) PORT değerini al (Railway atar, yoksa 3000)
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// E-posta gönderici yapılandırması
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// İletişim formu endpoint'i
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // E-posta içeriği
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Kendi e-posta adresiniz
            subject: 'Yeni İletişim Formu Mesajı',
            html: `
                <h3>Yeni İletişim Formu Mesajı</h3>
                <p><strong>Ad Soyad:</strong> ${name}</p>
                <p><strong>E-posta:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Mesaj:</strong> ${message}</p>
            `
        };

        // E-postayı gönder
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Mesajınız başarıyla gönderildi!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Mesaj gönderilirken bir hata oluştu.' });
    }
});

// Ana sayfa için statik dosyaları serve et
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
//Flag
=======
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

>>>>>>> 05591bd354cf335f60920db657cc9acce50384ef
