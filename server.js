// 
const dotenv = require('dotenv');
dotenv.config();

const http = require('http'); // core package

// MongoDB Connect (MongoDBni shu yerda ulaymiz)
// birinchi MongoDBni ulab, keyin serverni ishga tushirsak yaxshi bo'ladi

// mongoose external packageni install qilamiz, va chaqirib olamiz
const mongoose = require("mongoose");


// mongoDB compassdan --> mongo_atlas 'connection string'ni copy qilib, 
// 'connectionString'ga tenglab olamiz
// mongoDBni collection stringini olib keladi
const connectionString = process.env.MONGO_URL;


// mongoDBni documentationida 'connect' degan method bor, ichiga 3ta narsani pass qilishimiz kerak:
    // 1) connection String
    // 2) {userNewUrlParser: true, useUnifiedTopoligy: true}
    // 3) callback

mongoose.connect(
    connectionString, 
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    }, 
    (err, goose) => { // ikkinchi parameterga data yoki client deb yozvolamiz 
    // biz MongoDBga ulanganimizda - Error mavjud bo'lmasa MongoDBning clientini, instanceni bizga pass qiladi

    // agar ulanishimiz muvaffaqiyatsiz bo'lsa - console.log 'error' bersin
    if(err) console.log('ERROR: MongoDBga ulanish muvaffaqiyatsiz boldi!'); 
    
    // ask holda, ya'ni ulanishimiz muvaffaqiyatli bo'lsa, error bo'lmasa, bu holda serverimizni boshlaymiz
    else{ 
        // DataBasemiz muvaffaqiyatli ulangani uchun serverni boshlayapmiz
        console.log('MongoDB muvaffaqiyatli ulandi');

        // mongooseni connectionining instancesini olib beradi
        console.log(goose);

        // app ham, databaseimiz muvaffaqiyatli ulangash require qilinsin
        const app = require('./app'); // express app, ya'ni app.js boshlandi

        
        // createServer() --> method - bitta parameter qabul qiladi
        const server = http.createServer(app);

        // serverni ma'lum bir PORTga listen qildirish
        // process.env - o'zini PORTini tekshirsin, agar PORTda ma'lumot bo'lsa o'sha ma'lumotni saqlasin, 
        // agar ma'lumot bo'lmasa unda 3000ni qo'ysin
        let PORT = process.env.PORT || 3000;
        server.listen(PORT, function() { // server muvaffaqiyatli amalga oshsa, function ishga tushadi
            console.log(`server portda muvaffaqiyatli, ${PORT} portda ishlamoqda, http://localhost:${PORT}`);
        });
    }
});