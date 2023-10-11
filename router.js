// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router = express.Router();

// hamda bu router orqali turli hil routerlarni shakllantiramiz

// localhost:3000ga kirib kelgan requestimizga
router.get("/", function(req, res) {
    // javob beramiz:
    res.send("Home sahifadasiz");
});

// localhost:3000/menu
router.get("/menu", (req, res) => {
    res.send("Menu sahifadasiz");
});

// localhost:3000/community
router.get("/community", (req, res) => {
    res.send("Jamiyat sahifadasiz");
});

// hosil qilgan routerni export qiilb olamiz
module.exports = router;