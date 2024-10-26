const service = require('./serviceDB');

class DbController {
	async createCar(req, res) {
		try {
			const result = await service.createCar(req.body, req.headers.authorization);
			res.status(200).json(result);
			console.log("post ok");
		} catch (e) {
			console.log("post error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async createProduct(req, res) {
		try {
			const result = await service.createProduct(req.body, req.headers.authorization);
			res.status(200).json(result);
			console.log("post ok");
		} catch (e) {
			console.log("post error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async newPicture(req, res) {
		try {
			const result = await service.newPicture(req, req.headers.authorization);
			res.status(200).json(result);
			console.log("post ok");
		} catch (e) {
			console.log("post error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async getCars(req, res) {
		try {
			const cars = await service.getCars();
			res.status(200).json(cars);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async findeCars(req, res) {
		try {
			const result = await service.findeCars(req.query);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async editCar(req, res) {
		try {
			const result = await service.editCar(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("put ok");
		} catch (e) {
			console.log("put error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async deleteCar(req, res) {
		try {
			const result = await service.deleteCar(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("delete ok");
		} catch (e) {
			console.log("delete error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}

	async findeQuarter(req, res) {
		try {
			const result = await service.findeQuarter(req.query, req.headers.authorization);
			res.status(200).json(result);
			console.log("get ok");
		} catch (e) {
			console.log("get error!");
			if(e.name == "NoAuthorizatinon")
				res.status(401).json(e);
			else if (e.name == "NoAuthorizatinonAdmin")
				res.status(403).json(e);
			else
				res.status(500).json(e);
		}
	}
}

module.exports = new DbController();