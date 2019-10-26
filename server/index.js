const path = require('path');
const express = require('express');
const chalk = require('chalk');
const session = require('express-session');
const { syncAndSeed } = require('./db/index.js');
const User = require('./db/models/User');

const PORT = 3000;

// DONT WORRY ABOUT THIS, ITS TO HELP YA!
// Due to recent bug in nodemon, this will make sure it restarts without errors.
// If you see red text saying the port is already being used...
// lsof -i :3000
// kill ${the pid you see from the last command}
process.on('uncaughtException', (e) => {
  console.log(chalk.red(e.message));
  process.exit(0);
});

const app = express();

const STATIC_DIR = path.join(__dirname, '../static');

app.use(express.json());
app.use(express.static(STATIC_DIR));
app.use(session({
  secret: 'mysecret'
}));


// simple logging middleware to view each request in your terminal - this is useful for debugging purposes
app.use((req, res, next) => {
  console.log(`Request to ${req.path} - Body: `, req.body);
  next();
});

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;
    User.findOne({
      where: {
        username,
        password
      }
    })
    .then( user => {
      if (user) {
        // res.cookie('userId', user.id)
        res.send({
          id: user.id
        });
      } else {
        res.status(401).send({
          error: 'Cannot find user with specified credentials'
        })
      }
    })

});

app.post('/api/logout', (req, res, next) => {

});

app.get('/api/session', (req, res, next) => {

});

app.get('/user', (req, res, next) => {

});

app.get('*', (req, res) => res.sendFile(path.join(STATIC_DIR, './index.html')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ err });
});

syncAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`App now listening on http://localhost:${PORT}`));
    });
  });
