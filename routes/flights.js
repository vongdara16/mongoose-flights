import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.post('/', flightsCtrl.create)

router.delete('/:id/meals/:id', flightsCtrl.deleteMeal)

router.delete('/:id', flightsCtrl.delete)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.post('/:id/meals', flightsCtrl.addMeal)

export {
  router
}
