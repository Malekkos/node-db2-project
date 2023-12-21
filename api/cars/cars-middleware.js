const db = require("../../data/db-config")
const Car = require("./cars-model")

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const car = Car.getById(id)
  if (!car) {
    res.status(404).json({
      message: `car with id ${id} is not found`
    })
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }