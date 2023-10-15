// bitta object yasab olamiz, hamda bu objectni - modulning ichidagi exportsga tenglashtiramiz
// bu degani - endi biz bemalol 'memberController'larga - turli hil methodlarni yuklay olamiz degani
let memberController = module.exports;

const Member = require("../models/Member");


memberController.signup = async (req, res) => {
    try{
        console.log('POST: controller.signupga kimdir kirdi!'); // routerdan kirib kelyatgan requestni 
        
        const data = req.body; // requestni body qismidan ma'lumotni olamiz
        const member = new Member();
        const new_member = await member.signupData(data);

        // console.log('body::', req.body);

        res.json({state: 'succed', data: new_member}); // datani ichiga new_memberni beramiz
    } catch(err){
        console.log(`ERROR: controller.signupga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }

    /*
    POSTMANda - 
    {
    "mb_nick": "samo",
    "mb_password": "samo12",
    "mb_phone": 1234567890
    }
    -- JSON formatda - userni ma'lumotini yozib - 'SEND' qilsak --> terminalda: body:: { mb_nick: 'samo', mb_password: 'samo12', mb_phone: 1234567890 } chiqdi

    endi manashu ma'lumotdan foydalanib, 'Member.js'da(service modelda) - signupni processini qilamiz
    */
};

memberController.login = async (req, res) => {
    try{
        console.log('POST: controller.loginga kimdir kirdi!'); // routerdan kirib kelyatgan requestni 
        
        const data = req.body; // requestni body qismidan ma'lumotni olamiz
        const member = new Member();
        const result = await member.loginData(data);

        // console.log('body::', req.body);

        res.json({state: 'succed', data: result}); // datani ichiga new_memberni beramiz
    } catch(err){
        console.log(`ERROR: controller.loginga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

memberController.logout = (req, res) => {
    console.log('GET cont.logout');
    res.send("Logout sahifadasiz");
}






