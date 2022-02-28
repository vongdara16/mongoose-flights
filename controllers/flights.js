import { Flight } from '../models/flight.js'

function index(req, res){
  Flight.find({}, function (error, flights){
    console.log(error)
    res.render('flights/index', {
      flights
    })
  })
}

export {
  index, 
}