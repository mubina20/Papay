// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router = express.Router();
const memberController = require("./cotrollers/memberController");

// 
/**************************************************************************************
 *             REST API(REACT uchun kerak bo'lgan router hisoblanadi)                 *
 **************************************************************************************/

// hamda bu router orqali turli hil routerlarni shakllantiramiz
// 'MEMBER'ga dahldor routerlar
// shartli ravishda - 'member'larga dahldor router deb qabul qilib olamiz

// localhost:3000ga kirsak - 'Home Sahifadasiz' deb chiqadi
router.get("/", (req, res) => {
    memberController.home();
});
router.post("/signup",  memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", (req, res) => {
    memberController.logout();
});



// localhost:3000/menu
// boshqa routerlar
router.get("/menu", (req, res) => {
    res.send("Menu sahifadasiz");
});

// localhost:3000/community
router.get("/community", (req, res) => {
    res.send("Jamiyat sahifadasiz");
});

// hosil qilgan routerni export qiilb olamiz
module.exports = router;