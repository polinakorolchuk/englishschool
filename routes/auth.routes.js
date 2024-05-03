const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router();

const urlencodedParser = express.urlencoded({extended: false});
//рендерим страницу авторизации
// auth/login
router.get('/', authController.render);
// /login
router.get('/login', authController.render);

// Маршрут для аутентификации пользователя
router.post('/login', urlencodedParser, authController.loginController);

// Маршрут для рендеринга регистрации
router.get('/register', authController.renderReg);
// Маршрут для регистрации нового пользователя
router.post('/register', urlencodedParser, authController.registerController);


// Маршрут для выхода из аккаунта
router.get('/logout', (req, res) => {
res.clearCookie('token');
res.redirect('/');
});

// Маршрут для страницы администратора (с проверкой токена и точно ли user - admin)
router.get('/admin', authMiddleware.authenticateToken, authMiddleware.redirectUserRole, authController.rendAdmin);

// Маршрут для страницы пользователя
router.get('/user', authMiddleware.authenticateToken, authMiddleware.redirectUserRole, authController.rendUser);

module.exports = router;