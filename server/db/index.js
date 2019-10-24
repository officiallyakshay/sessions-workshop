const User = require('./models/User.js');
const db = require('./db.js');

const syncAndSeed = () => db
  .sync({ force: true })
  .then( async () => {
    // TODO: Seed...
      const userNames = [
        {userName: 'shay', password: 'SHAY' },
        {userName: 'zan', password: 'ZAN' },
        {userName: 'tdubs', password: 'TDUBS' },
        {userName: 'mclark', password: 'MCLARK' },
        {userName: 'jdmann', password: 'JDMANN' }
      ];
      const [shay, zan, tdubs, jdmann, mclark] = await Promise.all(userNames.map( userName => User.create(userName)));
    return true;
  })
  .catch(e => {
    console.error(e);
  });

module.exports = {
  models: {
    User,
  },
  db,
  syncAndSeed,
};
