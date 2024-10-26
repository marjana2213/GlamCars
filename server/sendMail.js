const mailer = require('nodemailer');
const {mail_host, mail_port, mail_user, mail_password} = require('./config');

class SendMail {
	constructor() {
		this.transporter = mailer.createTransport({
			host: mail_host,
			port: mail_port,
			secure: false,
			auth: {
				user: mail_user,
				pass: mail_password
			}
		});
	}

	async sendQuintationMail(to, id, data) {
		try{
			let autos = '';
			let sum = 0;
			
			data[0].forEach(async (auto, i) => {
				autos += '<h3>' + auto.brand + ' ' + auto.model + ' ' + auto.price + ' руб.</h3>';
				sum += auto.price;
			});

			let items = '';
			data[1].forEach(async (item, i) => {
				items += '<h3>' + item.name + ' ' + item.price + ' руб.</h3>';
				sum += item.price;
			});

			await this.transporter.sendMail({
				from: mail_user,
				to,
				subject: 'Квитанция Glam Cars',
				text: '',
				html: `<h1>Квитанция №${id}</h1>
				<h3>Заказ на покупку товаров:</h3>
				${autos}
				${items}
				<h3>К оплате: ${sum} руб.</h3>
				<h4>Заказ можно оплатить в нашем магазине или на сайте, приятной поездки!</h4>`
				});
		}
		catch(e){
			console.log(e);
		}
	}

	async sendBothCarMail(to, id, data) {
		try{
			let autos = '';
			data[0].forEach(async (auto, i) => {
				autos += '<h3>' + auto.brand + ' ' + auto.model + ' ' + auto.price + ' руб.</h3>';
			});

			let items = '';
			data[1].forEach(async (item, i) => {
				items += '<h3>' + item.name + ' ' + item.price + ' руб.</h3>';
			});

			await this.transporter.sendMail({
				from: mail_user,
				to,
				subject: 'Покупка Glam Cars',
				text: '',
				html: `<h1>Квитанция №${id} была успешно оплачена!</h1>
				<h3>Покупка товаров:</h3>
				${autos}
				${items}
				<h4>Приятной поездки!</h4>`
				});
		}
		catch(e){
			console.log(e);
		}
	}

	async sendRegMail(to) {
		try{
			await this.transporter.sendMail({
				from: mail_user,
				to,
				subject: 'Регистрация Glam Cars',
				text: '',
				html: `<h1>Вы были успешно зарегестрированны на сайте Glam Cars</h1>
				<h4>Если это были не вы, свяжитесь с нами по телефону 89212239433</h4>`
				});
		}
		catch(e){
			console.log(e);
		}
	}
}

module.exports = new SendMail();