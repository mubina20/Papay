/* 
server.jsda 2ta ish qilamiz:
1) MondoDBni ulaymiz
2) MongoDB muvaffaqiyatli ulansa - Serverni ishga tushiramiz
*/

const dotenv = require('dotenv'); // External package
dotenv.config(); // .env fileni kalitlarini yuklab oladi (PORT, MONGO_URLlarni)

const http = require('http'); // core package
// Serverni yasash, so'rov qabul qilish, portni eshitish ishlarini qiladi


const mongoose = require("mongoose"); // mongoose external packageni install qilamiz, va chaqirib olamiz

const connectionString = process.env.MONGO_URL; // .env filedagi MONGO_URL ya'ni connection string

// 1) MongoDB ulanadi
mongoose.connect( // connect() - 3ta parameter qabul qiladi:
    connectionString, // 1) MongoDB Serveri bilan ulanish uchun kerakli bog'lanish URLini o'z ichiga oladi
    {
    useNewUrlParser: true, 
    // 2) shu ikovi - MondoDBning yangi versiyalari uchun kerakli bo'lib, ular 변수larni ishlatishni ta'minlaydi
    useUnifiedTopology: true,
    }, 
    (err, goose) => { // 3) callback

    if(err) console.log('ERROR: MongoDBga ulanish muvaffaqiyatsiz boldi!'); // agar MongoDBni ulanishi muvaffaqiyatsiz bo'lsa - ERROR chiqsin
    
    else{ // ask holda, ya'ni ulanishi muvaffaqiyatli bo'lsa,

        // DataBasemiz muvaffaqiyatli ulangani uchun Expressni qurishni boshladi

        console.log('MongoDB muvaffaqiyatli ulandi'); // muvaffaqiyatli ulanganini log qilsin
        
        // 2) Server ishga tushadi
        const app = require('./app'); // app ham, databaseimiz muvaffaqiyatli ulangach require qilinsin

        const server = http.createServer(app); // 'app.js'dagi hamma ishlarni shu yerga olib kelib - Serverni yasayapmiz.    Hamma requestlar shu yerga keladi
        // createServer() --> method - bitta parameter qabul qiladi

        // serverni ma'lum bir PORTga listen qildirishimiz kerak
        let PORT = process.env.PORT || 3000; // process.env - o'zini PORTini tekshirsin:
        // agar PORTda ma'lumot bo'lsa - o'sha ma'lumotni saqlasin, 
        // agar ma'lumot bo'lmasa - unda 3000ni qo'ysin

        server.listen(PORT, function() { // server muvaffaqiyatli amalga oshsa, function ishga tushadi
            console.log(`server portda muvaffaqiyatli, ${PORT} portda ishlamoqda, http://localhost:${PORT}`);
        });
    }
});