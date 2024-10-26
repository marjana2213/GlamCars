const db = require('./postgresDB');
const multiparty = require('multiparty');
const {port, IMAGE_DIR} = require("./config");
const fs = require('fs');
const authentication = require('./authentication');

class ApiService {
	async createCar(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		const {brand, model, color, date, body, power, transmition, engine, unit, country, price, photo} = data;
		let url_photo = `http://localhost:${port}/Cars/${photo}`;
		const newCar = await db.query(
			`INSERT INTO cars (brand, model, color, date, body, power, transmition, engine, unit, country, price, sale, photo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, 
			[brand, model, color, date, body, power, transmition, engine, unit, country, price, true, url_photo]
		);	
		console.log(data);
		return (newCar.rows[0]);
	}

	async createProduct(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		const {name, description, price, photo} = data;
		let url_photo = `http://localhost:${port}/Cars/${photo}`;
		const newProduct = await db.query(
			`INSERT INTO items (name, description, price, sale, photo) values ($1, $2, $3, $4, $5) RETURNING *`, 
			[name, description, price, true, url_photo]
		);	
		console.log(data);
		return (newProduct.rows[0]);
	}

	async newPicture(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		let form = new multiparty.Form({uploadDir: `./${IMAGE_DIR}`});
		await form.parse(data, (err, fields, files) => {
			if(err){ 
				console.log(err.message);
				throw err;
			}

			fs.rename(files.image[0].path, `./${IMAGE_DIR}/${fields.name}`, (err) => {
				if(err){ 
					console.log(err.message);
					throw err;
				}
			});
		});
		return ('ok');
	}

	async getCars() {
		const cars = await db.query('SELECT * FROM cars ORDER BY brand');
		return (cars.rows);
	}

	async findeCars(data) {
		const {id, brand, model, color, date, body, power, transmition, engine, unit, country, price} = data;
		let whereSQL = 'WHERE ';
		let names = ['car_id', 'brand', 'model', 'color', 'date', 'body', 'power', 'transmition', 'engine', 'unit', 'country', 'price'];
		let params = [id, brand, model, color, date, body, power, transmition, engine, unit, country, price];
		params.forEach(async (param, i) => {
			if(param != '' && param != undefined)
				whereSQL += names[i] + ' = \'' + param + '\' AND ';
		});
		whereSQL = whereSQL.substring(0, whereSQL.length - 5);
		const carsWithParams = await db.query( `SELECT * FROM cars ${whereSQL} ORDER BY brand`);
		return (carsWithParams.rows);
	}

	async editCar(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		const {id, brand, model, color, date, body, power, transmition, engine, unit, country, price, photo} = data;
		if(id == undefined || id == '')
			return "Ошибка: не указан id!!!";
		let setSQL = 'SET ';
		let names = ['brand', 'model', 'color', 'date', 'body', 'power', 'transmition', 'engine', 'unit', 'country', 'price', 'photo'];
		let params = [brand, model, color, date, body, power, transmition, engine, unit, country, price, photo];
		params.forEach(async (param, i) => {
			if(param != '' && param != undefined)
				setSQL += names[i] + ' = \'' + param + '\', ';
		});
		setSQL = setSQL.substring(0, setSQL.length - 2);
		const carEdits = await db.query( `UPDATE cars ${setSQL} WHERE car_id = ${id} RETURNING *`);
		return (carEdits.rows);
	}

	async deleteCar(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		const carDelete = await db.query( `DELETE FROM cars WHERE car_id = ${data.id} RETURNING *`);
		return (carDelete.rows);
	}

	async findeQuarter(data, authorization) {
		const userData = authentication(authorization);
		if(userData.role != 'ADMIN') {
			let error = new Error();
			error.name = "NoAuthorizatinonAdmin";
			error.message = "Пользователь не авторизирован как админ!";
			throw error;
		}

		let {quarter} = data;
		let quarterDB = {rows: [{sum: 0}]};
		if(quarter == "All") {
			quarterDB = await db.query(`SELECT SUM(price) AS sum FROM cars
										JOIN orders 
										ON cars.car_id = orders.car_id AND orders.payment_date IS NOT NULL 
										WHERE cars.sale = false`);
		} else {
			quarter = Number(quarter);
			quarterDB = await db.query(`SELECT SUM(price) AS sum FROM cars 
										JOIN orders 
										ON cars.car_id = orders.car_id AND orders.payment_date IS NOT NULL 
										AND ((DATE_PART('year', NOW()) - DATE_PART('year', orders.payment_date)) * 12 +
              								(DATE_PART('month', NOW()) - DATE_PART('month', orders.payment_date))) <= ${quarter}
										WHERE cars.sale = false`);
		} 
		
		return (quarterDB.rows[0]);
	}
}

module.exports = new ApiService();