const db = require('../models');
const Article = db.articles;

exports.create = (req, res) => {
  const article = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  };

  Article.create(article)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Article.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Article.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Article not found with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Article was updated successfully.' });
      } else {
        res.send({ message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'Article was deleted successfully!' });
      } else {
        res.send({ message: `Cannot delete Article with id=${id}. Maybe Article was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
