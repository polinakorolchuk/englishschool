const config = require('config')
const jwt = require('jsonwebtoken');

// Middleware для проверки наличия и валидности JWT-токена в cookie
exports.authenticateToken = (req, res, next) => {
  console.log(req.cookies.token)
    const token = req.cookies.token;
    if (!token) {
  
     // res.status(401).send('Unauthorized');
      res.redirect('/auth');
    }
  
    try {
      const decodedToken = jwt.verify(token, config.get('JWT_Secret'));
      
      req.user = decodedToken;
      next();
    } catch (error) {
      //res.status(401).send('Unauthorized');
      console.log('   catch   ')
      res.redirect('/auth');

    }
  }
  
  // Middleware для проверки роли пользователя и перенаправления на соответствующую страницу
  exports.redirectUserRole = (req, res, next) => {
    const userRole = req.user.role;
    const currentUrl = req.originalUrl;
  
    if (userRole === 'admin' && currentUrl !== '/auth/admin') {
      return res.redirect('/auth/admin');
    } else if (userRole === 'user' && currentUrl !== '/auth/user') {
      return res.redirect('/auth/user');
    } else if (userRole !== 'admin' && currentUrl.startsWith('/auth/admin')) {
      return res.redirect('/');
    }
  
    next();
  }

// получить пользователя
exports.getUser = (req, res) => {
  const token = req?.cookies?.token;
  let user = {
    name: "Unknown"
  }
    try {
      user = jwt.verify(token, config.get('JWT_Secret'));
    } catch (error) {
      console.error(error)       
    }
  return user
}