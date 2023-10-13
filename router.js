// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router = express.Router();
const memberController = require("./cotrollers/memberController");

// hamda bu router orqali turli hil routerlarni shakllantiramiz

// localhost:3000ga kirib kelgan requestimiz
// manashu URLga kelgan requestlar - tegishli 'Controller'ga beriladi
// 'MEMBER'ga dahldor routerlar
// shartli ravishda - 'member'larga dahldor router deb qabul qilib olamiz
// router.get("/", function(req, res) {
    /* 
    biz bu yerda - 'Controller'lar yasaymiz, 
    // va u 'Controller'lar - 'Model'larga vazifa yuklaydi
    // * lekin biz hozirgacha taxlab olgan narsamiz - VIEW edi, ejs orqali view qurib olgandik va ejsga data ham yuklagandik 
    */

    // javob beramiz:
    // res.send("Home sahifadasiz");
// });
//-----------------------------------------------------------------------------

// 'MEMBER'ga dahldor routerlar
// shartli ravishda - 'member'larga dahldor router deb qabul qilib olamiz

// localhost:3000ga kirsak - 'Home Sahifadasiz' deb chiqadi
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);



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