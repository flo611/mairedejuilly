const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const { verifyToken } = require('../middleware/authJwt');

router.post('/', verifyToken, articlesController.create);
router.get('/', articlesController.findAll);
router.get('/:id', articlesController.findOne);
router.put('/:id', verifyToken, articlesController.update);
router.delete('/:id', verifyToken, articlesController.delete);

module.exports = router;
