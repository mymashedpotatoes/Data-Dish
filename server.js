const express = require("express");
const recipeRoutes = require ("./routes/recipeRoutes");
const sequelize  = require("./config/connection");


const app = express();
const port = process.env.PORT || 3001;


//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes
app.use(recipeRoutes);




// Start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on http://localhost:${port}`)
    });
  });