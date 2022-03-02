import mongoose from "mongoose";

const Schema = mongoose.Schema

const mealSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}