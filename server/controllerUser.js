const service = require('./serviceUser');

class UserController {
	async createUser(req, res) {
		try {
			const result = await service.createUser(req.body);
			res.status(200).json(result);
			console.log("post user ok");
		} catch (e) {
			console.log("post user error!");
			if(e.name == "ValidationError")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async loginUser(req, res) {
		try {
			const result = await service.loginUser(req.body);
			res.cookie('refreshToken', result.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, secure: true, sameSite: 'none'});
			res.status(200).json(result.token);
			console.log("login user ok");
		} catch (e) {
			console.log("login user error!");
			if(e.name == "ValidationError")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async addToBasket(req, res) {
		try {
			const result = await service.addToBasket(req.body, req.headers.authorization);
			res.status(200).json(result);
			console.log("post basket ok");
		} catch (e) {
			console.log("post basket error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if(e.name == "ThisProductInBasket")
				res.status(409).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getStore(req, res) {
		try {
			const result = await service.getStore(req.query);
			res.status(200).json(result);
			console.log("get store ok");
		} catch (e) {
			console.log("get store error!");
			if(e.name == "ValidationError")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getStoreProduct(req, res) {
		try {
			const result = await service.getStoreProduct();
			res.status(200).json(result);
			console.log("get store ok");
		} catch (e) {
			console.log("get store error!");
			if(e.name == "ValidationError")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getBarnds(req, res) {
		try {
			const result = await service.getBarnds();
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "ValidationError" )
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getModels(req, res) {
		try {
			const result = await service.getModels(req.query);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "ValidationError")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async buyCar(req, res) {
		try {
			const result = await service.buyCar(req.headers.authorization);
			res.status(200).json(result);
			console.log("post ok");
		} catch (e) {
			console.log("post error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoBasket" || e.name == "NoCar")
				res.status(409).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getQuintation(req, res) {
		try {
			const result = await service.getQuintation(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getBasket(req, res) {
		try {
			const result = await service.getBasket(req.headers.authorization);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async payForCar(req, res) {
		try {
			const result = await service.payForCar(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("put ok");
		} catch (e) {
			console.log("put error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async checkToken(req, res) {
		try {
			const result = await service.checkToken(req.headers.authorization);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async checkTokenAdmin(req, res) {
		try {
			const result = await service.checkTokenAdmin(req.headers.authorization);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if(e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async updateToken(req, res) {
		try {
			const result = await service.updateToken(req.cookies);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async logOut(req, res) {
		try {
			const result = await service.logOut(req.headers.authorization);
			res.status(200).json(result);
			console.log("delete ok");
		} catch (e) {
			console.log("delete error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async deleteFromBasket(req, res) {
		try {
			const result = await service.deleteFromBasket(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("delete ok");
		} catch (e) {
			console.log("delete error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}

	async deleteFromBasketAll(req, res) {
		try {
			const result = await service.deleteFromBasketAll(req.headers.authorization);
			res.status(200).json(result);
			console.log("delete ok");
		} catch (e) {
			console.log("delete error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else
				res.status(500).json(e);
		}
	}
}

module.exports = new UserController();