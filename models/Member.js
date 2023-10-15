// modulelar - classlar bilan hosil bo'ladi

// SIGNUPni hosil qilyapmiz

// Service modelimizda - Schema modelni chaqirib olamiz

const MemberModel = require('../schema/member.model');
const Definer = require('../lib/mistake');
const assert = require('assert');
const { exec } = require('child_process');
const bcrypt = require('bcryptjs');

class Member {
    constructor() {
        this.memberModel = MemberModel;
    }

    async signupData(input) {
        try{
            // DataBasega signup qilyatgan payt userimiz password yozadi
            // biz o'sha passwordni DataBasega sahranit qilishdan oldin 'hash' qilib olamiz 
            const salt = await bcrypt.genSalt();
            input.mb_password = await bcrypt.hash(input.mb_password, salt); // bcrypt hash orqali - inputni ichidagi mb_passwordni o'zgartiramiz, hamda birinchi qarameteri - inputdan kelayotgan mb_password bo'ladi, ikkinchi parameteri - salt bo'ladi
            // va shunday ketyin inputni yuboramiz 
            const new_member = new this.memberModel(input);

            let result; // object
            try{
                const result = await new_member.save();
                // console.log(result);
            } catch(mongo_err) {
                console.log(mongo_err);
                throw new Error(Definer.auth_err1);
            }
            
            
            result.mb_password = "";

            return result;

        } catch(err) {
            throw err;
        }
    }    

    async loginData(input) {
        try{
            const member = await this.memberModel
            .findOne(
                {mb_nick: input.mb_nick}, 
                {mb_nick: 1, mb_password: 1})
            .exec();

            assert.ok(member, Definer.auth_err3);

            const isMatch = await bcrypt.compare(
                input.mb_password, 
                member.mb_password);
            assert.ok(isMatch, Definer.auth_err4);

            return await this.memberModel
            .findOne({
                mb_nick: input.mb_nick
            })
            .exec();

        } catch(err) {
            throw err;
        }
    }
}

module.exports = Member;