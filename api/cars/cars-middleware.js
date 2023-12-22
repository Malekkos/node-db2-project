const db = require("../../data/db-config")
const Car = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const car = await Car.getById(id)
  const error = { status: 404 }
  console.log(car)
  if (!car) {
    error.message = `car with id ${id} is not found`
    next(error)
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
  const error = { status: 400 }
  console.log(vin, make, model, mileage)
  if (!vin) {
    console.log("There is an error in check car payload")
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
  // DO YOUR MAGIC
  const vin = req.body.vin
  const isValidVin = vinValidator.validate(vin)
  console.log("we are in checkVinNumberValid")
  if(isValidVin === false) {
    console.log("something terrible in checkvinnumbervalid")
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const id = req.params.id
  console.log("about to get the car!")
  const car = await Car.getById(id)
  console.log("this is the car", car)
  if (car.vin === vin) {
    console.log("something terrible has happened in the vin unique checker")
    res.status(400).json({
      message: `vin ${vin} already exists`
    })
  } else {
    next()
  }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }