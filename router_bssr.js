// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router_bssr = express.Router();
const restaurantController = require("./cotrollers/restaurantController");

/**************************************************************************************
 *                 BSSR(EJS uchun kerak bo'lgan router hisoblanadi)                   *
 **************************************************************************************/


// Bu yerda - RESTAURANT Controller bo'ladi, bu ham SERVICE MODELni ishlatadi ya'ni 'MEMBER'ni

router_bssr.get("/signup",  (req, res) => {
    restaurantController.getSingupMyRestaurant();
});
router_bssr.post("/signup",  restaurantController.signupProcess);

router_bssr.get("/login", (req, res) => {
    restaurantController.getLoginMyRestaurant();
});
router_bssr.post("/login",restaurantController.loginProcess);


router_bssr.get("/logout", (req, res) => {
    restaurantController.logout();
});


// hosil qilgan routerni export qiilb olamiz
module.exports = router_bssr;