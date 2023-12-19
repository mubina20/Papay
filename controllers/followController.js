const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require('../models/Follow');

let followController = module.exports;

followController.subscribe = async (req, res) => {
    try{
        console.log("POST: Kimdir subscribe qildi!");
        // console.log("REQ.BODY:::", req.body);

        assert.ok(req.member, Definer.auth_err5);

        const follow = new Follow();
        const result = await follow.subscribeData(req.member, req.body);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: Subscribe qilishda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz!', message: "Subscribe qilishda xatolik bo'ldi!"});
    }
};

followController.unsubscribe = async (req, res) => {
    try{
        console.log("POST: Kimdir unsubscribe qildi!");

        assert.ok(req.member, Definer.auth_err5);

        const follow = new Follow();
        const result = await follow.unsubscribeData(req.member, req.body);

        res.json({state: "Muvaffaqiyatli", data: result});
    } catch(err) {
        console.log(`ERROR: Unsubscribe qilishda xatolik bo'ldi!, ${err.message}`);
        res.json({state: 'Muvaffaqiyatsiz!', data: "Unsubscribe qilishda xatolik bo'ldi!"});
    }
};

followController.getMemberFollowings = async (req, res) => {
    try{
        console.log("GET: Kimdir followinglarni ko'rmoqda!");
        // console.log("QUERY:::", req.query);

        const follow = new Follow();
        const result = await follow.getMemberFollowingsData(req.query);

        res.json({state: "Muvaffaqiyatli", data: result})
    } catch(err) {
        console.log(`ERROR: Followinglarni ko'rishda xatokil bo'ldi! ${err.message}`);
        res.json({state: "Muvaffaqiyatsiz!", message: "getMemberFollowingsda xatolik bo'ldi!"})
    }
};

followController.getMemberFollowers = async (req, res) => {
    try {
        console.log("GET: cont/getMemberFollowers");
        const follow = new Follow();
        const result = await follow.getMemberFollowersData(req.member, req.query);
    
        res.json({ state: "success", data: result });
    } catch (err) {
        console.log(`ERROR, cont/getMemberFollowers ${err.message}`);
        res.json({ state: "fail", message: err.message });
    }
};