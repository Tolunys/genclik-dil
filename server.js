const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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