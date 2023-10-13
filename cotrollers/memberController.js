// bitta object yasab olamiz, hamda bu objectni - modulning ichidagi exportsga tenglashtiramiz
// bu degani - endi biz bemalol 'memberController'larga - turli hil methodlarni yuklay olamiz degani
let memberController = module.exports;

// homepage ya'ni "/" routerga - method yasayapmiz
memberController.home = (req, res) => {
    // request kelganda bizga ko'rsatib tursin
    console.log('GET cont.home');
    res.send("Home sahifadasiz");
}

memberController.signup = (req, res) => {
    console.log('POST cont.singup');
    res.send("Signup sahifadasiz");
}

memberController.login = (req, res) => {
    console.log('POST cont.login');
    res.send("Login sahifadasiz");
}

memberController.logout = (req, res) => {
    console.log('GET cont.logout');
    res.send("Logout sahifadasiz");
}






