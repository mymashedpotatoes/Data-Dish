const express = require("express");
const recipeRoutes = require ("./routes/recipeRoutes");
const shoppingCartRoutes = require ("./routes/shoppingCartRoutes");
const sequelize  = require("./config/connection");
const exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3001;

//set  up Handlebars 
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// lets app be able to use recipeRoutes where ever it needs to call it 
app.use(recipeRoutes);
app.use(shoppingCartRoutes);




// Start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on http://localhost:${port}`)
    });
  });