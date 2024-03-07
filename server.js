const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require("./controllers")
const recipeRoutes = require ("./routes/recipeRoutes");

const sequelize  = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//Middleware 
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(recipeRoutes);
app.use(routes)






// Start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on http://localhost:${port}`)
    });
  });