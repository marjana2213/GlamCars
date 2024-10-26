const express = require('express');
const cookieParser = require('cookie-parser');
const carsRouter = require('./routesDB');
const userRouter = require('./routesUser');
const cors = require('cors');
const {port} = require('./config');

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.static("PictureCloud"));

server.use(cors({
	origin: "*"
}));

server.use('/', carsRouter);
server.use('/', userRouter);

server.listen(port, () => {
	console.log(`http://localhost:${port}`);
});