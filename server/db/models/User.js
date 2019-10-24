const { STRING } = require('sequelize');
const db = require('../db.js');

// TODO: Fill out this model.
const User = db.define('user', {
  uselessColumn: {
    type: STRING,
  },
  userName: {
    type: STRING
  },
  password: {
    type: STRING
  }
});

module.exports = User;
