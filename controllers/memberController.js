let memberController = module.exports;

const Member = require("../models/Member");

memberController.signup = async (req, res) => { 
    try{ 
        console.log('POST: controller / signupga kimdir kirdi!');
        const data = req.body; 

        const member = new Member(); 
        const new_member = await member.signupData(data); 

        res.json({state: 'muvaffaqiyatli', data: new_member});
    } catch(err){ 
        console.log(`ERROR: controller / signupga kirishda xatolik boldi! ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message}); 
    }
};

memberController.login = async (req, res) => {
    try{
        console.log('POST: controller / loginga kimdir kirdi!');
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        res.json({state: 'muvaffaqiyatli', data: result});
    } catch(err){
        console.log(`ERROR: controller / loginga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}

memberController.logout = (req, res) => {
    console.log('POST: controller / logoutga kimdir kirdi!');
    res.send("Logout sahifadasiz");
}






