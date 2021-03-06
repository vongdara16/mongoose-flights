import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function index(req, res){
  Flight.find({})
  .sort({departs: 'asc'})
  .exec ((error, flights) => {
    console.log(error)
    res.render("flights/index", {
      flights,
      title: 'List of Flights'
    })
  })
}

function newFlight(req, res){
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    departsDate,
    title: 'Add Flight'
  });
}

function create(req, res){
  console.log('create a new flight')
  for (let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)

  flight.save(function(err){
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    res.redirect('/flights')
  })
}

function show(req, res){
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(err, flight){
    Meal.find({_id: {$nin: flight.meals}}, function(err, meals){
      res.render('flights/show', {
        flight,
        title: "Flight Details",
        meals,
      })
    })
  })
}

function createTicket(req, res){
  Flight.findById(req.params.id, function(err, flight){
    flight.tickets.push(req.body)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addMeal(req, res){
  Flight.findById(req.params.id, function(err, flight){
    flight.meals.push(req.body.mealId)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteMeal(req, res){
  console.log('testing')
  console.log(req.params.id)
  Meal.findByIdAndDelete(req.params.id, function(err, meal){
    res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  createTicket,
  addMeal,
  deleteMeal,
}