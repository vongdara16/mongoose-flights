import { Flight } from '../models/flight.js'

function index(req, res){
  Flight.find({}, function (error, flights){
    console.log(error)
    res.render('flights/index', {
      flights
    })
  })
}

function newFlight(req, res){
  console.log('new flight')
  res.render('flights/new')
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

function show(req, res){
  Flight.findById(req.params.id, function(err, flight){
    res.render('flights/show', {
      flight,
      title: "Flight Details"
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

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket,
}