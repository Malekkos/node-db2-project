const router = require("express").Router()
const Car = require("./cars-model")

const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require("./cars-middleware")


router.get("/", (req, res, next) => {
  Car.getAll()
  .then(cars => {
    res.status(200).json(cars)
  })
  .catch(error => {
    next(error)
  })
})

router.get("/:id", checkCarId, (req, res, next) => {
  Car.getById(req.id)
  .then(car => {
    res.status(200).json(car)
  })
  .catch(error => {
    next(error)
  })
})

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
  const newCar = req.body
  Car.create(newCar)
  .then(car => {
    Car.getById(car)
    .then(car => {
      res.status(200).json(car)
    })
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