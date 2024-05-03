const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const coursesController = require('../controllers/courses.controller');
const {authenticateToken} = require('../middleware/auth.middleware');

// Роут для создания нового курса

// Роут для обновления курса

// Роут для удаления курса

// Роут для получения всех курсов
router.get("/", coursesController.coursesList);

router.get("/show/:id", authenticateToken, coursesController.courseShow);
// Роут для получения списка всех курсов

// поиск

module.exports = router;