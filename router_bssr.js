// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router_bssr = express.Router();
const restaurantController = require("./cotrollers/restaurantController");

/**************************************************************************************
 *                      BSSR(EJS uchun kerak bo'lgan router)                          *
 **************************************************************************************/

// Bu yerda - RESTAURANT Controller bo'ladi, bu ham SERVICE MODELni ishlatadi ya'ni 'MEMBER'ni

// SIGNUP
router_bssr.get("/signup",restaurantController.getSingupMyRestaurant);
router_bssr.post("/signup", restaurantController.signupProcess);

// LOGIN
router_bssr.get("/login",restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);

// LOGOUT
router_bssr.get("/logout", restaurantController.logout);


// hosil qilgan routerni export qiilb olamiz
module.exports = router_bssr;