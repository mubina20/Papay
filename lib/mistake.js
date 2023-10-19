class Definer {
    // bu ERRORlarni ko'p joyda ishlatkanimiz uchun - alohida filega solib oldik, keragini olib ishlataveramiz

    static auth_err1 = "att: mongoDB tekshiruvi amalga oshmadi";
    static auth_err3 = "att: bu nicknamedagi user yo'q";
    static auth_err4 = "att: hisob ma'lumotlariz to'g'ri kelmayapti";
}

// Definer classni export qilamiz
module.exports = Definer;