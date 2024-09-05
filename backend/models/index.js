const Sequelize = require('sequelize');
const config = require('../config/db.config.js');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize.DataTypes);
db.articles = require('./article.model.js')(sequelize, Sequelize.DataTypes);

module.exports = db;
