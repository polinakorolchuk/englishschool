const express = require('express');
const config = require('config')
const mongoose =  require('mongoose')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const authMiddleware = require('./middleware/auth.middleware')
const Course = require('./models/course'); // Укажите правильный путь к модели 
const Chosen = require('./models/chosen'); // Укажите правильный путь к модел


const app = express();
const PORT = config.get('PORT') || 5000;

//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Маршрут для выхода из аккаунта
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
    });


    
app.get( '/analytics', (req, res) => {
    try {
        res.render('pages/p_admin/kabinet', { contentPath: 'analytics', pageTitle: 'PuzzleEnglish', name: authMiddleware.getUser(req, res).name});
        } catch (error) {
        
    }
});

// Указываем, что мы будем использовать EJS в качестве шаблонизатора
app.set('view engine', 'ejs');
// Настройка статической директории
app.use(express.static('views'));
//сервер может парсить json
//app.use(express.json());//middleware
//правильное использование куки сервером
/* app.use(express.urlencoded({ extended: true })); */

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // добавьте эту строку

app.use(cookieParser());
app.use(morgan('dev'));

//маршрутизация входа
app.use('/auth', require('./routes/auth.routes'))
//маршрутизация запроса основной страницы
app.use('/', require('./routes/index.routes'))
app.use('/courses', require('./routes/courses.routes'))
app.use('/users', require('./routes/users.routes'))
app.use('/chosen', require('./routes/chosen.routes'))
app.use('/reviews', require('./routes/review.routes'))


//app.get ????
  


async function start(){
    try{

        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //createIndexes: true
        } )
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1);
    }
}
async function start(){
  try{

    await mongoose.connect('mongodb+srv://korolchuuuk:AEqDbN5WugGHc4EU@cluster0.2fbozow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{ 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      //createIndexes: true 
  } )
      app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  }catch(e){
      console.log('Server error', e.message)
      process.exit(1);
  }
}

start();
