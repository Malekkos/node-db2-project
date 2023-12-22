const db = require("../../data/db-config")

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db("cars")
  return result
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db("cars").where({"id": id}).first()
  return result
}

const create = async (car) => {
  // DO YOUR MAGIC
  const result = await db("cars").insert(car)
  return result
}

const getByVin = async (vin) => {
  const result = await db("cars").where({"vin": vin}).first()
  return result
}


module.exports = { getAll, getById, create, getByVin} 