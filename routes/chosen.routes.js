const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Chosen = require('../models/chosen');
const Student = require('../models/student');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/auth.middleware')

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

router.get('/', authMiddleware.authenticateToken, async (req, res) => {
  try {
    const user = authMiddleware.getUser(req, res);
    const tickets = await Ticket.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'student'
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$course',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'student.user': new mongoose.Types.ObjectId(user._id),
          'course': { $ne: [] }
        }
      }
    ]);

    console.log(tickets);
    // не работает
    //res.render('pages/p_user/kabinet', { tickets , name: req.user.name, pageTitle: "Courses", contentPath: "showPlaces"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});


// Отображение формы 

module.exports = router;