console.log('Web serverni boshlash');

// express frameworkini install qilib, chaqiriladi
const exp = require('express');

// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();

const router = require('./router');

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



// 3) Views code    (Express uchun BSSRda folder yasaymiz)

// view yasash uchun folder kerak
app.set("views", "views"); // views folderni ko'rsatyapmiz

// view engine - ejs ekanini ko'rsatyapmiz
app.set("view engine", "ejs");

// demak, EJS orqali BackEndda FrontEnd yasaymiz


// 4) Routing code
// har qanday 'epress'ga kelgan requestlar - 'router.js'ga borsin
app.use("/", router);

// appni export qilamiz
module.exports = app;