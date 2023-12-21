const db = require("../../data/db-config")
const Car = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const car = Car.getById(id)
  if (!car) {
    res.status(404).json({
      message: `car with id ${id} is not found`
    })
  } else {
    req.id = id
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  //Assuming its under payload
  const vin = req.body.vin
  const make = req.body.make
  const model = req.body.model
  const mileage = req.body.mileage
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({
      message: `` //revisit, not sure how to determine which field is missing
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const isValidVin = vinValidator.validate(vin)
  if(isValidVin === false) {
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const id = req.params.id
  const car = Car.getById(id)
  if (car.vin === vin) {
    res.status(400).json({
      message: `vin ${vin} already exists`
    })
  } else {
    next()
  }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }