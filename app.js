console.log('Web serverni boshlash');

// express frameworkini install qilib, chaqiriladi
const exp = require('express');

// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();

const router = require('./router');
const router_bssr = require('./router_bssr');

// let session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const store = new MongoDBStore({
//     uri: process.env.MONGO_URL,
//     collection: "session"
// });

// 1) Kirish code  
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// harqanday browserdan kirib kelayotgan requestlar uchun public folderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
// publicda - frontEndga tegishli bo'lgan JS, CSS, imagelar publicga boradi
app.use(exp.static('public'));

// kirib kelayotgan JSON formatdagi datalarni objectga o'girib beradi
app.use(exp.json());

// HTML post qilingan formalarni qabul qiladi
// bu bo'lmasa qabul qilmaydi
app.use(exp.urlencoded({ extended: true }));
// HTML formalari orqali POST so'rovlarini qabul qilish va ulardan kelgan ma'lumotlarni analiz qilish uchun ishlatiladi.



// 2) Session code
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         cookie: {
//             maxAge: 1000 * 60 * 30,
//         },
//         store: store,
//         resave: true,
//         saveUninitialized: true
//     })
// );

// 3) Views code    (Express uchun BSSRda folder yasaymiz)

// view yasash uchun folder kerak
app.set("views", "views"); // views folderni ko'rsatyapmiz

// view engine - ejs ekanini ko'rsatyapmiz
app.set("view engine", "ejs");

// demak, EJS orqali BackEndda FrontEnd yasaymiz


// 4) Routing code
// har qanday 'epress'ga kelgan requestlar - 'router.js'ga borsin

// agar '/resto' bilan boshlansa - shu routerga yuboriladi
app.use("/resto", router_bssr); // ( Traditional). '/resto' FrontEnd applicationimiz - faqatgina ADMIN va RESTARANT userlar uchun kerakli bo'lgan loyiha/narsa (BackEnddagi FrontEnd)

// agar '/resto' bilan boshlanmasa - qolganini hozirgacha yasagan routerimizga yuboradi
app.use("/", router); // (react uchun ishlatamiz). Bu loyihamiz esa - haridorlar uchun kerakli bo'lgan FrontEnd loyihasidir (FrontEnd)

// appni export qilamiz
module.exports = app;