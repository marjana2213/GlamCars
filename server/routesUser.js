const Router = require('express');
const router = new Router();
const userConroller = require('./controllerUser');

router.post('/registration', userConroller.createUser);
router.post('/login', userConroller.loginUser);
router.post('/addbasket', userConroller.addToBasket);
router.post('/buycar', userConroller.buyCar);

router.get('/store', userConroller.getStore);
router.get('/storeproduct', userConroller.getStoreProduct);
router.get('/brands', userConroller.getBarnds);
router.get('/models', userConroller.getModels);
router.get('/updatetoken', userConroller.updateToken);
router.get('/checktoken', userConroller.checkToken);
router.get('/checktokenadmin', userConroller.checkTokenAdmin);
router.get('/quintation', userConroller.getQuintation);
router.get('/getbasket', userConroller.getBasket);

router.put('/paycar', userConroller.payForCar);

router.delete('/deletebasket', userConroller.deleteFromBasket);
router.delete('/deletebasketall', userConroller.deleteFromBasketAll);
router.delete('/logout', userConroller.logOut);

module.exports = router;