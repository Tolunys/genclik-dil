const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/genclik-dil', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch((err) => console.log('MongoDB bağlantı hatası: ', err));

// Scholarship Application Schema
const scholarshipSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    school: { type: String, required: true },
    grade: { type: String, required: true },
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentOccupation: { type: String, required: true },
    applicationDate: { type: Date, default: Date.now }
});

const ScholarshipApplication = mongoose.model('ScholarshipApplication', scholarshipSchema);

// API Endpoints
app.post('/api/scholarship', async (req, res) => {
    try {
        console.log('Gelen başvuru verisi:', req.body);
        const application = new ScholarshipApplication(req.body);
        await application.save();
        console.log('Başvuru başarıyla kaydedildi:', application);
        res.status(201).json({ message: 'Başvuru başarıyla kaydedildi', application });
    } catch (error) {
        console.error('Başvuru kaydedilirken hata:', error);
        res.status(400).json({ 
            message: 'Başvuru kaydedilirken bir hata oluştu', 
            error: error.message,
            details: error.errors 
        });
    }
});

// Get all applications
app.get('/api/scholarship', async (req, res) => {
    try {
        const applications = await ScholarshipApplication.find().sort({ applicationDate: -1 });
        console.log('Başvurular başarıyla getirildi:', applications.length);
        res.json(applications);
    } catch (error) {
        console.error('Başvurular getirilirken hata:', error);
        res.status(500).json({ 
            message: 'Başvurular getirilirken bir hata oluştu', 
            error: error.message 
        });
    }
});

// Get single application
app.get('/api/scholarship/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Başvuru getiriliyor, ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Geçersiz ID formatı:', id);
            return res.status(400).json({ message: 'Geçersiz başvuru ID formatı' });
        }

        const application = await ScholarshipApplication.findById(id);
        if (!application) {
            console.log('Başvuru bulunamadı:', id);
            return res.status(404).json({ message: 'Başvuru bulunamadı' });
        }

        console.log('Başvuru bulundu:', application);
        res.json(application);
    } catch (error) {
        console.error('Başvuru getirilirken hata:', error);
        res.status(500).json({ 
            message: 'Başvuru getirilirken bir hata oluştu', 
            error: error.message 
        });
    }
});

// Delete application
app.delete('/api/scholarship/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Silinecek başvuru ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Geçersiz ID formatı:', id);
            return res.status(400).json({ message: 'Geçersiz başvuru ID formatı' });
        }

        const result = await ScholarshipApplication.findByIdAndDelete(id);
        if (!result) {
            console.log('Başvuru bulunamadı:', id);
            return res.status(404).json({ message: 'Başvuru bulunamadı' });
        }

        console.log('Başvuru başarıyla silindi:', result);
        res.json({ 
            message: 'Başvuru başarıyla silindi', 
            deletedApplication: result 
        });
    } catch (error) {
        console.error('Başvuru silinirken hata:', error);
        res.status(500).json({ 
            message: 'Başvuru silinirken bir hata oluştu', 
            error: error.message 
        });
    }
});

// Contact Form Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Form gönderme endpoint'i
app.post('/api/contact', async (req, res) => {
    try {
        const { name, phone, message } = req.body;
        const contact = new Contact({ name, phone, message });
        await contact.save();
        res.status(201).json({ message: 'Form başarıyla gönderildi' });
    } catch (error) {
        console.error('Form gönderme hatası:', error);
        res.status(500).json({ message: 'Form gönderilirken bir hata oluştu' });
    }
});

// Tüm mesajları getir
app.get('/api/contact', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Mesajları getirme hatası:', error);
        res.status(500).json({ message: 'Mesajlar getirilirken bir hata oluştu' });
    }
});

// Mesaj sil
app.delete('/api/contact/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Mesaj başarıyla silindi' });
    } catch (error) {
        console.error('Mesaj silme hatası:', error);
        res.status(500).json({ message: 'Mesaj silinirken bir hata oluştu' });
    }
});

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Bursluluk sayfası route'u
app.get('/bursluluk', (req, res) => {
    res.sendFile(path.join(__dirname, 'bursluluk.html'));
});

// Admin sayfası route'u
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 