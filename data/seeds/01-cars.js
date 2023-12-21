// STRETCH

const cars = [
  {
    vin:  "28649728473068473",
    make:  "toyota",
    model:  "prius",
    mileage:  124055,
    title:  "clean",
    transmission:  "manual",
  },
  {
    vin:  "28649728473058473",
    make:  "toyota",
    model:  "corolla",
    mileage:  124211,
    title:  "dirty",
    transmission:  "automatic",
  }
]

exports.seed = async function (knex) {
  await knex("cars").truncate()
  await knex("cars").insert(cars)
}