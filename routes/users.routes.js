const express = require('express');
const router = express.Router();
const {
  createUserForm,
  createUser,
  getAllUsers,
  getUser,
  editUserForm,
  editUser,
  deleteUser,
} = require('../controllers/users.controller');

// Создание пользователя
router.get('/create', createUserForm);
router.post('/create', createUser);

// Чтение пользователя
router.get('/', getAllUsers);
router.get('/:id', getUser);

// Обновление пользователя
router.get('/:id/edit', editUserForm);
router.post('/:id/edit', editUser);

// Удаление пользователя
router.get('/:id/delete', deleteUser);

module.exports = router;