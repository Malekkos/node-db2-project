const Car = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  const car = await Car.getById(id)
  const error = { status: 404 }
  if (!car) {
    error.message = `car with id ${id} is not found`
    next(error)
  } else {
    req.id = id
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const vin = req.body.vin
  const make = req.body.make
  const model = req.body.model
  const mileage = req.body.mileage
  const error = { status: 400 }
  if (!vin) {
    error.message = "vin is missing"
    next(error)
  } else if (!make) {
    error.message = "make is missing"
    next(error)
  } else if (!model) {
    error.message = "model is missing"
    next(error)
  } else if (!mileage) {
    error.message = "mileage is missing"
    next(error)
  } else {
    console.log("going next")
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin
  const isValidVin = vinValidator.validate(vin)
  if(!isValidVin) {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin
  const car = await Car.getByVin(vin)
  const error = { status: 400 }
  console.log(car)
  if (car) {
    error.message = `vin ${vin} already exists`
    next(error)
  } else {
    next()
  }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }