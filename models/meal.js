import mongoose from "mongoose";

const Schema = mongoose.Schema

const mealSchema = new Schema({
  name: String,
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}