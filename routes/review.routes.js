const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const Review = require('../models/review');

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

router.get('/', async (req, res) => {
    try {
      const user = authMiddleware.getUser(req, res);
      const reviews = await Review.find({}).sort({_id: -1});
      if(user.role === 'admin')
      res.render('pages/p_admin/kabinet', { reviews, name: user.name,  pageTitle: "Review", contentPath: "Review"});
      else
      res.render('pages/p_user/kabinet', { name: user.name,  pageTitle: "Review", contentPath: "Review"});
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
    }
  });
  
  

  router.post('/new', async (req, res) => {
    try {
      const review = new Review({
        username: req.body.name,
        message: req.body.message,
      });
      await review.save();
      res.status(201).json({ _id: review._id, message: 'Отзыв успешно отправлен' }); // Отправляем данные об успешной отправке в теле ответа
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка отправки отзыва' }); // Отправляем данные об ошибке в теле ответа
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedReview = await Review.findByIdAndDelete(id);
      
      if (!deletedReview) {
        return res.status(404).send({ message: 'Отзыв не найден' });
      }
      
      res.status(204).send();
    
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Не удалось удалить отзыв' });
    }
  });


  module.exports = router;