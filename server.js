const http = require('http'); // core package

// MongoDB Connect (MongoDBni shu yerda ulaymiz)
// birinchi MongoDBni ulab, keyin serverni ishga tushirsak yaxshi bo'ladi

// mongodb packageni isntall qilib chaqirib olamiz
const mongodb = require('mongodb'); // external package


// mongoDB compassdan --> mongo_atlas 'connection string'ni copy qilib, 
// 'connectionString'ga tenglab olamiz
const connectionString = "mongodb+srv://mina:7f1F7WxY1EaEFzjf@cluster0.tepyubl.mongodb.net/Reja";


// mongoDBni documentationida 'connect' degan method bor, ichiga 3ta narsani pass qilishimiz kerak:
    // 1) connection String
    // 2) {userNewUrlParser: true, useUnifiedTopoligy: true}
    // 3) callback

mongodb.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, (err, client) => { // ikkinchi parameterga data yoki client deb yozvolamiz 
    // biz MongoDBga ulanganimizda - Error mavjud bo'lmasa MongoDBning clientini, instanceni bizga pass qiladi

    // agar ulanishimiz muvaffaqiyatsiz bo'lsa - console.log 'error' bersin
    if(err) console.log('ERROR: MongoDBga ulanish muvaffaqiyatsiz boldi!'); 
    
    // ask holda, ya'ni ulanishimiz muvaffaqiyatli bo'lsa, error bo'lmasa, bu holda serverimizni boshlaymiz
    else{ 
        // DataBasemiz muvaffaqiyatli ulangani uchun serverni boshlayapmiz
        console.log('MongoDB muvaffaqiyatli ulandi');

        // biz kelajakda 'client' bilan juda ko'p ishlaymiz
        // shuning uchun 'client'ni export qilib olamiz
        // 'client' - biz uchun tahlab berilgan DataBase Connection Object
        module.exports = client; 
        // console.log(client);

        // app ham, databaseimiz muvaffaqiyatli ulangash require qilinsin
        const app = require('./app'); // express app, ya'ni app.js boshlandi

        
        // createServer() --> method - bitta parameter qabul qiladi
        const server = http.createServer(app);

        // serverni ma'lum bir PORTga listen qildirish
        let PORT = process.env.PORT || 3000;
        server.listen(PORT, function() { // server muvaffaqiyatli amalga oshsa, function ishga tushadi
            console.log(`server portda muvaffaqiyatli, ${PORT} portda ishlamoqda, http://localhost:${PORT}`);
        });
    }
});