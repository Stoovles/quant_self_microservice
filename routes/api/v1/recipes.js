var express = require('express');
var router = express.Router();
var Recipe = require('../../../models/recipe')
var recipesController = require('../../../controllers/api/v1/recipes_controller');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
var pry = require('pryjs');

const { Model } = require('objection');
Model.knex(database)
