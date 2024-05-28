const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router();

router.get('/', async (req, res) =>{
    const cars = await Car.getAll()
    res.json(cars)
})

router.get('/:id',checkCarId ,(req, res) => {
    res.json(req.car)
})

router.post('/', checkCarPayload,
checkVinNumberValid,
checkVinNumberUnique, async (req, res) => {
    const newCar = await Car.create(req.body)
    res.status(201).json(newCar)

} )

module.exports = router