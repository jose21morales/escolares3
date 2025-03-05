const express = require('express');
const { login, register, session, logout, products } = require('../controllers/authController');
const cartController = require('../controllers/cartController')
const { search } = require('../controllers/searchController')
const { createOrder, captureOrder, cancelOrder } = require('../controllers/paypalController')

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/session', session)
router.post('/logout', logout)
router.get('/products', products)
router.post('/cart/add', cartController.addToCart)
router.get('/cart',cartController.getCart)
router.post('/cart/remove',cartController.removeFromCart)
router.post('/cart/updatequantity', cartController.updateCartItemQuantity)
router.get('/search', search)
router.post('/paypal/create-order', createOrder)
router.post('/paypal/capture-order', captureOrder)
router.post('/paypal/cancel-order', cancelOrder)

module.exports = router;
