// DO YOUR MAGIC

const router = require("express").Router()
const Car = require("./cars-model")

const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require("./cars-middleware")


router.get("/", (req, res, next) => {
  Car.getAll()
  .then(cars => {
    console.log("getAll from cars-router has ran")
    res.status(200).json(cars)
  })
  .catch(error => {
    next(error)
  })
})


router.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad inside of the cars-router"
  })
})

module.exports = router;