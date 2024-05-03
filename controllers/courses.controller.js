const Course = require("../models/course");
const authMiddleware = require('../middleware/auth.middleware')

exports.createCourse = async (req, res) => {
  const {
    language,
    teacher,
    level,
    lesson,
    price
  } = req.body;

  try {
    const course = new Course({
      language,
      teacher,
      lesson,
      level,
      price,
      places: [
        { seatNumber: "1", isAvailable: true },
        { seatNumber: "2", isAvailable: true },
        { seatNumber: "3", isAvailable: true },
        { seatNumber: "4", isAvailable: true },
        { seatNumber: "5", isAvailable: true },
        { seatNumber: "6", isAvailable: true },
        { seatNumber: "7", isAvailable: true },
        { seatNumber: "8", isAvailable: true },
        { seatNumber: "9", isAvailable: true },
        { seatNumber: "10", isAvailable: true },


       
      ],
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.courseEdit = async (req, res) => {
  try {
    const course = await course.findById(req.params.id)
    console.log(course)
    res.render("pages/p_admin/kabinet", {
      contentPath: "adminCourseEdit",
      pageTitle: 'Course edit',
      course: course,
      name: authMiddleware.getUser(req, res).name
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching courses');
  }
};

exports.coursesList = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({_id: -1}); // DESC сортировка по id
  
    res.render("pages/p_admin/kabinet", {
      contentPath: "adminCoursesList",
      pageTitle: 'Courses',
      courses: courses,
      name: authMiddleware.getUser(req, res).name
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching courses');
  }
}

exports.courseCreate = async (req, res) => {
  try {
    const course= await Course.find(req.params.id)
    console.log(course)
    res.render("pages/p_admin/kabinet", {
      contentPath: "adminCourseCreate",
      pageTitle: 'Course create',
      course: course,
      name: authMiddleware.getUser(req, res).name
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching courses');
  }
};

exports.courseShow = async (req, res) => {
  try {


    // console.log(req.cookies.token)
    /* const token = req.cookies.token;
    if (!token) {
      console.log('   if   ')
     // res.status(401).send('Unauthorized');
      res.redirect('/auth');
      return
    }
  
    try {
      const decodedToken = jwt.verify(token, config.get('JWT_Secret'));
      console.log(decodedToken);
      req.user = decodedToken;
      //next();
    } catch (error) {
      //res.status(401).send('Unauthorized');
      console.log('   catch   ')
      res.redirect('/auth');
      return
    } */
  




    //const isAuthenticated = req.cookies.isAuthenticated; // получаем значение куки isAuthenticated

    /* if (isAuthenticated) { // если пользователь авторизован
      res.redirect(`/flights/${req.params.id}/buy`); // перенаправляем на страницу покупки билета
    } else { // если пользователь не авторизован
      res.redirect('/auth'); // перенаправляем на страницу авторизации
    } */

    
    const course = await Course.findById(req.params.id);
    // console.log(flight);
    res.render("pages/p_user/kabinet", {
      contentPath: "CourseShow",
      pageTitle: 'Course show',
      name: req.user.name,
      course: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching courses');
  }
};

exports.rendeAdminCourseCreate = async (req, res) => {
  try {
    res.render("pages/p_admin/kabinet", {
      contentPath: "adminCourseCreate",
      pageTitle: 'Course create',
      name: authMiddleware.getUser(req, res).name
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching courses');
  }
}
