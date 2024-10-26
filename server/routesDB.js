const Router = require('express');
const router = new Router();
const dbConroller = require('./controllerDB');

router.post('/new', dbConroller.createCar);
router.post('/newproduct', dbConroller.createProduct);
router.post('/newpicture', dbConroller.newPicture);
router.get('/cars', dbConroller.getCars);
router.get('/finde', dbConroller.findeCars);
router.get('/quarter', dbConroller.findeQuarter);
router.put('/edit', dbConroller.editCar);
router.delete('/delete', dbConroller.deleteCar);

module.exports = router;