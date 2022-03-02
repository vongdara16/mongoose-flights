import { Meal } from '../models/meal.js'

function newMeal(req, res){
  Meal.find({}, function(err, meals){
    res.render('meals/new', {
      meals,
    })
  })
}

export {
  newMeal as new,
}