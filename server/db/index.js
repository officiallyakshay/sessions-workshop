const User = require('./models/User.js');
const db = require('./db.js');

const syncAndSeed = () => db
  .sync({ force: true })
    .then( async () => {
      const usernames = [
        {username: 'shay', password: 'SHAY' },
        {username: 'zan', password: 'ZAN' },
        {username: 'tdubs', password: 'TDUBS' },
        {username: 'mclark', password: 'MCLARK' },
        {username: 'jdmann', password: 'JDMANN' }
      ];
      const [shay, zan, tdubs, jdmann, mclark] = await Promise.all(usernames.map( username => User.create(username) ));
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
