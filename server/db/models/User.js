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

const sync = async () => {
  await db.sync({ force: true });


  const userNames = [
    {userName: 'shay', password: 'SHAY' },
    {userName: 'zan', password: 'ZAN' },
    {userName: 'tdubs', password: 'TDUBS' },
    {userName: 'mclark', password: 'MCLARK' },
    {userName: 'jdmann', password: 'JDMANN' }
  ];

  const [shay, zan, tdubs, jdmann, mclark] = await Promise.all(userNames.map( userName => User.create(userName)));
}

module.exports = {
  sync,
  models: {
    User
  }
};
