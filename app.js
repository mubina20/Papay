console.log('Web serverni boshlash');

// express frameworkini install qilib, chaqiriladi
const exp = require('express');

// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();

const router = require('./router');

// MongoDBni chaqiramiz
// .db() -- MongoDBni objecti
// biz shu orqali DataBasega turli hil ma'lumotlarni yozish, o'chirish, o'qish yoki delete qilish operatsiyalarini amalga oshiramiz
const db = require('./server').db();
// mongodbni pasta kerak edi, shuning uchun require qildik
const mongodb = require('mongodb');

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
// har kelgan requestlarni - router.jsga yubor
app.use("/", router);

module.exports = app;