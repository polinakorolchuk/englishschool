const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config')
const bcrypt = require('bcryptjs')
//страница авторизации
exports.render = async(req, res) => {
  try {
      res.render('pages/p_index/commonpage', { contentPath: 'auth', pageTitle: 'PuzzleEnglish'});
      } catch (error) {
      
  }
}

//страница регистрации
exports.renderReg = async(req, res) => {
  try {
      res.render('pages/p_index/commonpage', { contentPath: 'register', pageTitle: 'PuzzleEnglish'});
      } catch (error) {
      
  }
}

//страница администратора
exports.rendAdmin = async(req, res) => {
  try {
      res.render('pages/p_admin/kabinet', { contentPath: 'admin', pageTitle: 'PuzzleEnglish', name: req.user.name});
      } catch (error) {
        console.log(error);

  }
}

//кабинет пользователя
exports.rendUser = async(req, res) => {
  try {
    
      res.render('pages/p_user/kabinet', { contentPath: 'user', pageTitle: 'PuzzleEnglish', name: req.user.name});
      } catch (error) {
      console.log(error);
  }
}

// Контроллер для аутентификации пользователя
exports.loginController = async (req, res) => {
  try {
    console.log(req.body);
    // Проверяем наличие пользователя в базе данных
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      //res.status(400).send('Invalid name or password');
      return res.redirect('/');
    }

    // Проверяем пароль
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      //res.status(400).send('Invalid name or password');
      return res.redirect('/');
    }

    // Создаем и подписываем JWT-токен
    const token = jwt.sign(
      { _id: user._id , name: user.name, role: user.role },
      config.get('JWT_Secret')
    );

    // Определяем, на какую страницу перенаправить пользователя
    let redirectUrl = '/';
    if (user.role === 'admin') {
      redirectUrl = '/auth/admin';
    } else if (user.role === 'user') {
      redirectUrl = '/auth/user';
    }

    // Отправляем токен и перенаправляем пользователя на соответствующую страницу
    res.cookie('token', token);
    return res.redirect(redirectUrl);
  } catch (error) {
    //res.status(400).send(error.message);
    return res.redirect('/');

  }
}

exports.registerController = async (req, res) => {
  try {
    // Получаем данные из тела запроса
    const { name, password} = req.body;
    console.log(req.body);
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = new User({
      name,
      password: hashedPassword,
      role: 'user',
    });

    // Сохраняем пользователя в базе данных
    console.log(await user.save());




    // Отправляем ответ с сообщением об успешной регистрации
    //res.status(201).send('User created successfully!');
    return res.redirect('/auth/login');

  } catch (error) {
    // Если при регистрации произошла ошибка
    console.error(error);
    //res.sendStatus(500);
     return res.redirect('/');
  }
}