const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../db.js');

// TODO: Fill out this model.
const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  userName: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: STRING
  }
});

module.exports = User;

