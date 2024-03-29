let memberController = module.exports;

const Member = require("../models/Member");
const jwt = require('jsonwebtoken');
const assert = require('assert');
const Definer = require('../lib/mistake');

memberController.signup = async (req, res) => { 
    try{ 
        console.log('POST: Kimdir SIGNUP qildi!');
        const data = req.body; 

        const member = new Member(); 
        const new_member = await member.signupData(data); 

        const token = memberController.createToken(new_member);
		res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false
		});

        res.json({state: 'success', data: new_member});
    } catch(err){ 
        console.log(`ERROR: SIGNUP qilishda xatolik boldi! ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message}); 
    }
};

memberController.login = async (req, res) => {
    try{
        console.log('POST: Kimdir LOGIN qildi!');
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        const token = memberController.createToken(result);
        // console.log("TOKEN:::", token);
        res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false,
		});

        res.json({state: 'success', data: result});
    } catch(err){
        console.log(`ERROR: LOGIN qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}

memberController.logout = (req, res) => {
    console.log('POST: Kimdir LOGOUT qildi!');
	res.cookie('access_token', null, {maxAge: 0, httpOnly: true});
    res.send("Logout bo'ldingiz");
}

memberController.createToken = (result) => {
	try {
		const upload_data = {
			_id: result._id,
			mb_nick: result.mb_nick,
			mb_type: result.mb_type
		};

		const token = jwt.sign(
			upload_data, 
			process.env.SECRET_TOKEN, 
			{ expiresIn: '6h' } // TOKENni amal qilish muddati
		);

		assert.ok(token, Definer.auth_err2);
		return token;
	} catch (err) {
		throw err;
	}
};

memberController.checkMyAuthentication = (req, res) => {
	try {
		console.log('GET: checkMyAuthentication');

		let token = req.cookies['access_token'];
		// console.log("TOKEN:::", token);

		const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
		assert.ok(member, Definer.auth_err2);

		res.json({ state: 'success', data: member });
	} catch (err) {
		throw err;
	}
};

memberController.getChosenMember = async (req, res) => {
	try {
		console.log('GET cont/getChosenMember');

		const id = req.params.id;
		const member = new Member();
		const result = await member.getChosenMemberData(req.member, id);

		// console.log('result:::', result);
		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR, cont/getChosenMember, ${err.message}`);

		const error = `<script>alert("Something went wrong!")</script>`;
		res.end(error);
	}
};

memberController.likeMemberChosen = async (req, res) => {
	try {
		console.log('POST: User like bosmiqda! (likeMemberChosen)');

		assert.ok(req.member, Definer.auth_err5);
		
		const like_ref_id = req.body.like_ref_id;
		const group_type = req.body.group_type;
		// console.log("LIKE_REF_ID:::", like_ref_id);
		// console.log("GROUP_TYPE:::", group_type);

		const member = new Member();
		const result = await member.likeChosenItemByMember(req.member, like_ref_id, group_type);

		res.json({ state: 'Muvaffaqiyatli', data: result });
	} catch (err) {
		console.log(`ERORR: Like bosishda xatolik bo'ldi!, ${err.message}`);
		res.json({state: 'muvaffaqiyatsiz!', message: "Like bosishda xatolik bo'ldi!"});
	}
};

memberController.updateMember = async (req, res) => {
	try {
		console.log("POST: User informationni o'zgartirmoqda");
		console.log("req.body:::",req.body);
		// console.log("req.file:::", req.file);
		// console.log("mb_image:::", req.body.mb_image);

		assert.ok(req.member, Definer.auth_err3);
		const member = new Member();
		const result = await member.updateMemberData(
			req.member?._id, 
			req.body, 
			req.file
		);
		
		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: User informationni o'zgartirishda xatolik bo'ldi! (updateMember), ${err.message}`);
		res.json({ state: 'fail', message: "User informationni o'zgartirishda xatolik bo'ldi! (updateMember)" });
	}
};

memberController.retrieveAuthMember = async (req, res, next) => {
	try {
		const token = req.cookies['access_token'];
		req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
		next();
	} catch (err) {
		console.log(`ERORR: retrieveAuthMember, ${err.message}`);
		next();
	}
};