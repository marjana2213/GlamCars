const db = require('./postgresDB');
const access = require('./serviceToken');
const authentication = require('./authentication');
const mailSender = require('./sendMail');
const utility = require('./utility');
const bcrypt = require('bcryptjs');
const {car_type, item_type} = require("./config");

class UserService {
	async createUser(data) {
		const {email, telephone, password, first_name, last_name, middle_name} = data;

		let salt = utility.RandomInt(5, 15);
		const hashPassword = bcrypt.hashSync(password, salt);

		const findePerson = await db.query(`SELECT email FROM persons WHERE email = '${email}'`);

		if(findePerson.rowCount == 0) {
			const newPerson = await db.query(
				`INSERT INTO persons (email, first_name, last_name, middle_name, telephone, password, role) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
				[email, first_name, last_name, middle_name, telephone, hashPassword, 'USER']
			);
			console.log(email, first_name, last_name, middle_name, telephone, hashPassword);
			await mailSender.sendRegMail(email);

			return ('Успешно!');
		} else {
			var error = new Error();
			error.name = "ValidationError";
			error.message = "Пользователь с такой почтой уже существует!";
			throw error;
		}
	}

	async loginUser(data) {
		const {email, password} = data;

		const findePerson = await db.query(`SELECT * FROM persons WHERE email = '${email}'`);
		if(findePerson.rowCount == 1) {
			const etalonPassword = findePerson.rows[0].password;
			const validPassword = bcrypt.compareSync(password, etalonPassword);
			if(!validPassword){
				var error = new Error();
				error.name = "ValidationError";
				error.message = "Неверный пароль!";
				throw error;
			}

			const user_id = findePerson.rows[0].id;
			const first_name = findePerson.rows[0].first_name;
			const role = findePerson.rows[0].role;
			const findeUser = await access.findeToken(user_id);
			const token = access.generateToken({user_id, first_name, email, role});
			let refreshToken = "";
			if(findeUser.rowCount == 1) {
				refreshToken = findeUser.rows[0].token;
				const userData = access.validateRefreshToken(refreshToken);
				if(userData)
					return {token, refreshToken};
			}
			refreshToken = access.generateRefreshToken({user_id, first_name, email, role});
			await access.saveTokenToDB(user_id, refreshToken);

			return {token, refreshToken};

		} else {
			var error = new Error();
			error.name = "ValidationError";
			error.message = "Пользователь с такой почтой не существует!";
			throw error;
		}
	}

	async addToBasket(data, authorization) {
		const userData = authentication(authorization);

		const {product_id, product_type} = data;

		const idBasket = await db.query(`SELECT id FROM baskets WHERE person_id = ${userData.user_id} AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id)`);

		if(idBasket.rowCount == 0) {
			const newBasket = await db.query(`INSERT INTO baskets (id, person_id, product_id, product_type) 
											  values ((SELECT COALESCE(MAX(id), 0) FROM baskets) + 1, ${userData.user_id}, ${product_id}, '${product_type}') RETURNING *`);
		} else {
			const haveProduct_idBasket = await db.query(`SELECT * FROM baskets WHERE id = ${idBasket.rows[0].id} AND product_id = ${product_id} AND product_type = '${product_type}'`);
			if(haveProduct_idBasket.rowCount == 0) {
				const addBasket = await db.query(`INSERT INTO baskets (id, person_id, product_id, product_type) 
												  values (${idBasket.rows[0].id}, ${userData.user_id}, ${product_id}, '${product_type}') RETURNING *`);
			} else {
				let error = new Error();
				error.name = "ThisProductInBasket";
				error.message = "Этот товар уже в корзине!";
				throw error;
			}
		}

		return ('Добавлен в корзину!');
	}

	async deleteFromBasket(data, authorization) {
		const userData = authentication(authorization);

		const {product_id, product_type} = data;

		const deleteBasket = await db.query( `DELETE FROM baskets 
											WHERE person_id = ${userData.user_id} 
											AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id) 
											AND product_id = ${product_id} AND product_type = '${product_type}' RETURNING *`);

		return('Элемент удалён из корзины!');
	}

	async deleteFromBasketAll(authorization) {
		const userData = authentication(authorization);

		const daleteBasket = await db.query( `DELETE FROM baskets WHERE person_id = ${userData.user_id} AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id) RETURNING *`);

		return('Корзина удалена!');
	}

	async logOut(authorization) {
		const userData = authentication(authorization);

		const tokenDelete = await db.query( `DELETE FROM tokens WHERE user_id = ${userData.user_id} RETURNING *`);
		return (tokenDelete.rows[0]);
	}

	async getStore(data) {
		const {brand, model, body, transmition, engine, unit, min_price, max_price, min_power, max_power} = data;
		let whereSQL = 'WHERE ';
		let names = ['brand', 'model', 'body', 'transmition', 'engine', 'unit'];
		let params = [brand, model, body, transmition, engine, unit];
		params.forEach(async (param, i) => {
			if(param != '' && param != undefined && param != null)
				whereSQL += names[i] + ' IN (' + utility.fomatToArraySQL(param) + ') AND ';
		});
		whereSQL += 'price >= \'' + min_price + '\' AND ' + 'price <= \'' + max_price + '\' AND ' + 'power >= \'' + min_power + '\' AND ' + 'power <= \'' + max_power + '\' AND sale = true';
		const carsWithParams = await db.query( `SELECT * FROM cars ${whereSQL} ORDER BY brand`);

		return carsWithParams.rows;
	}

	async getStoreProduct() {
		const carsWithParams = await db.query( `SELECT * FROM items WHERE sale = true ORDER BY name`);

		return carsWithParams.rows;
	}

	async getBarnds() {
		const brands = await db.query(`SELECT DISTINCT brand FROM cars WHERE sale = true ORDER BY brand`);

		return brands.rows;
	}

	async getModels(data) {
		const {brands} = data;

    	let brands_sql = utility.fomatToArraySQL(brands);

		const models = await db.query(`SELECT DISTINCT model FROM cars WHERE brand IN (${brands_sql}) AND sale = true ORDER BY model`);

		return models.rows;
	}

	async buyCar(authorization) {
		const userData = authentication(authorization);

		const idBasket = await db.query(`SELECT id FROM baskets WHERE person_id = ${userData.user_id} AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id)`);

		if(idBasket.rowCount == 0) {
			let error = new Error();
			error.name = "NoBasket";
			error.message = "Корзина пустая!";
			throw error;
		}

		const cars = await db.query( `UPDATE cars SET sale = false 
									  WHERE car_id IN (SELECT product_id FROM baskets WHERE person_id = ${userData.user_id} AND product_type = '${car_type}'
									  AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id)) 
									  AND sale = true RETURNING *`);

		const items = await db.query( `UPDATE items SET sale = false 
									  WHERE id IN (SELECT product_id FROM baskets WHERE person_id = ${userData.user_id} AND product_type = '${item_type}'
									  AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id)) 
									  AND sale = true RETURNING *`);

		if(cars.rowCount != 0 || items.rowCount != 0) {
			const order = await db.query(`INSERT INTO orders (basket_id, payment_date) values (${idBasket.rows[0].id}, NULL) RETURNING *`);

			await mailSender.sendQuintationMail(userData.email, order.rows[0].id, [cars.rows, items.rows]);

			const deleteBaskets = await db.query(`DELETE FROM baskets AS B1 
												  WHERE ((B1.product_id IN (SELECT B2.product_id FROM baskets AS B2 WHERE B2.person_id = '${userData.user_id}' AND B2.product_type = '${car_type}'))
												  OR (B1.product_id IN (SELECT B3.product_id FROM baskets AS B3 WHERE B3.person_id = '${userData.user_id}' AND B3.product_type = '${item_type}')))
												  AND B1.person_id != '${userData.user_id}' RETURNING *`);

			return order.rows[0];
		}

		let carError = new Error();
		carError.name = "NoCar";
		carError.message = "Товары не найдены!";
		throw carError;
	}

	async getQuintation(data, authorization) {
		const userData = authentication(authorization);

		let {id} = data;

		const order = await db.query(`SELECT * FROM orders WHERE id = ${id}`);

		const carsDB = await db.query(`SELECT * FROM cars WHERE car_id IN (SELECT product_id FROM baskets WHERE baskets.id = ${order.rows[0].basket_id} AND product_type = '${car_type}')`);

		const itemsDB = await db.query(`SELECT * FROM items WHERE id IN (SELECT product_id FROM baskets WHERE baskets.id = ${order.rows[0].basket_id} AND product_type = '${item_type}')`);

		const personDB = await db.query(`SELECT first_name, last_name, middle_name FROM persons WHERE id = ${userData.user_id}`);

		return {'id' : id, 'products' : [carsDB.rows, itemsDB.rows], 'person' : personDB.rows[0]};
	}

	async getBasket(authorization) {
		const userData = authentication(authorization);

		const idBasket = await db.query(`SELECT * FROM baskets WHERE person_id = ${userData.user_id} AND NOT EXISTS(SELECT * FROM orders WHERE basket_id = baskets.id)`);

		if(idBasket.rowCount != 0) {
			const carsDB = await db.query(`SELECT * FROM cars WHERE car_id IN (SELECT product_id FROM baskets WHERE baskets.id = ${idBasket.rows[0].id} AND product_type = '${car_type}')`);

			const itemsDB = await db.query(`SELECT * FROM items WHERE id IN (SELECT product_id FROM baskets WHERE baskets.id = ${idBasket.rows[0].id} AND product_type = '${item_type}')`);

			return ([idBasket.rows, carsDB.rows, itemsDB.rows]);
		} else {
			return ([idBasket.rows]);
		}
	}

	async payForCar(data, authorization) {
		const userData = authentication(authorization);

		const {id} = data;

		const order = await db.query(`UPDATE orders SET payment_date = NOW() WHERE id = ${id} RETURNING *`);

		const cars = await db.query(`SELECT * FROM cars WHERE car_id IN (SELECT product_id FROM baskets WHERE baskets.id = ${order.rows[0].basket_id} AND product_type = '${car_type}')`);

		const items = await db.query(`SELECT * FROM items WHERE id IN (SELECT product_id FROM baskets WHERE baskets.id = ${order.rows[0].basket_id} AND product_type = '${item_type}')`);

		await mailSender.sendBothCarMail(userData.email, order.rows[0].id, [cars.rows, items.rows]);

		return order.rows[0];
	}

	async checkToken(token) {
		const userData = authentication(token);

		const first_name = userData.first_name;

		return {first_name};
	}

	async checkTokenAdmin(token) {
		const userData = authentication(token);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		const first_name = userData.first_name;

		return {first_name};
	}

	async updateToken(data) {
		const {refreshToken} = data;

		let error = new Error();
		error.name = "NoAuthorizatinon";
		error.message = "Пользователь не авторизирован!";

		if(!refreshToken)
			throw error;

		const userData = access.validateRefreshToken(refreshToken);
		if(!userData)
			throw error;

		const user_id = userData.user_id;
		const findeUser = await access.findeToken(user_id);
		if(findeUser.rowCount == 0)
			throw error;

		const findePerson = await db.query(`SELECT * FROM persons WHERE id = '${user_id}'`);
		const first_name = findePerson.rows[0].first_name;
		const email = findePerson.rows[0].email;
		const role = findePerson.rows[0].role;
		const newToken = access.generateToken({user_id, first_name, email, role});

		return {newToken};
	}
}

module.exports = new UserService();