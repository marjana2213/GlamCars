const db = require('./postgresDB');
const jwt = require('jsonwebtoken');
const {secret, refresh_secret} = require("./config");

class TokenAccess {
	generateToken(data) {
		return jwt.sign(data, secret, {expiresIn: '15m'});
	}

	generateRefreshToken(data) {
		return jwt.sign(data, refresh_secret, {expiresIn: '720h'});
	}

	validateToken(token){
		try {
			return jwt.verify(token, secret);
		} catch(e) {
			return false;
		}
	}

	validateRefreshToken(token){
		try {
			return jwt.verify(token, refresh_secret);
		} catch(e) {
			return false;
		}
	}

	async findeToken(id) {
		const findeUser = await db.query(`SELECT * FROM tokens WHERE user_id = '${id}'`);
		return findeUser;
	}

	async saveTokenToDB(id, token) {
		const findeUser = await db.query(`SELECT * FROM tokens WHERE user_id = '${id}'`);
		if(findeUser.rowCount == 0) {
			const newPerson = await db.query(`INSERT INTO tokens (user_id, token, date) values ('${id}', '${token}', NOW()) RETURNING *`);
			return true;
		}
		const tokenEdit = await db.query( `UPDATE tokens SET token = '${token}', date = NOW() WHERE user_id = '${id}' RETURNING *`);
		return true;
	}
}

module.exports = new TokenAccess();