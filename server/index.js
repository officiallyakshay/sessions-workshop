const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const chalk = require('chalk');
const { syncAndSeed } = require('./db/index.js');
const User = require('./db/models/User')

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

app.use(expressSession({
  saveUninitialized: true,
  resave: false,
  secret: 'Xan\'s secret'
}));

// simple logging middleware to view each request in your terminal - this is useful for debugging purposes
app.use((req, res, next) => {
  // req.session = {};
  console.log(`Request to ${req.path} - Body: `, req.body);
  next();
});

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ 
      where: {
        userName: username,
        password: password
      }
    })
    if (!user) {
      res.redirect('/');
    } else {
      req.session.user = user;
      res.send(user);
    }
  }
  catch(ex) {
    next(ex);
  }

  // console.log(user);
  // console.log(req.session.user);
  // TODO: This obviously isn't all we should do...
  res.status(200).send({ something: 'probably user related?' });
  // You can toggle this to see how the app behaves if an error goes down...
  // res.status(401).send({ message: 'You are unauthorized!' });
});

app.post('/api/logout', (req, res, next) => {
  // TODO: Build this functionality.
  req.session = null;
  res.status(204).send({ message: 'Logged out' })
  next();
});

app.get('/api/session', (req, res, next) => {
  // TODO: Build this functionality.
  const user = req.session.user;
  if (user) {
    return res.send(user);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
});

app.get('/user', (req, res, next) => {
  // req.session.username = users[req.params.username];
  // console.log(req.session.username)
  // if (!req.body.username) {
  //   res.redirect('/')
  // }
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
