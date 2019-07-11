const express = require("express");
const app = express();
const router = express.Router();
var pry = require('pryjs');
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
var request = require('request');

// Load OpenWeather Credentials
// var Edamam = require('../config/third-party').edamam;

function recipes(body) {
  var i;
  var recipe = [];
  for (i = 0; i < body.hits.length; i++) {
    recipe.push({
      recipeName: body.hits[i].recipe.label,
      calories: body.hits[i].recipe.calories,
      recipeUrl: body.hits[i].recipe.url,
      ingredientList: body.hits[i].recipe.ingredientLines,
      yield: body.hits[i].recipe.yield,
      dietLabels: body.hits[i].recipe.dietLabels,
      healthLabels: body.hits[i].recipe.healthLabels,
      fatQuantity: body.hits[i].recipe.totalNutrients.FAT,
      carbQuantity: body.hits[i].recipe.totalNutrients.CHOCDF,
      sugarQuantity: body.hits[i].recipe.totalNutrients.SUGAR,
      proteinQuantity: body.hits[i].recipe.totalNutrients.PROCNT,
      totalWeight: body.hits[i].recipe.totalWeight
    })
  }
  return recipe;
};


app.get('/api/v1/recipes', function (req, res) {
    var urlEdamam = 'https://api.edamam.com/search?app_id=15d059e5&app_key=76f822aa52ba2e34305aec992d7e3622&from=0&to=2'
    var queryObject = {
          q: req.query.q,
        diet: req.query.diet,
        calories: req.query.calories,
        health: req.query.health,
        ingr: req.query.ingr
    }
    request({
        url:urlEdamam,
        qs: queryObject
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            var jsonBody = JSON.parse(body)
            var jsonBody = { data:
              {
                foodType: jsonBody.q,
                recipes: recipes(jsonBody)
              }
            }
            res.send(jsonBody)
        }
    })
})



module.exports = app;





// var recipesRouter = require('./routes/api/v1/recipes');

// app.use('/api/v1/recipes', recipesRouter);
