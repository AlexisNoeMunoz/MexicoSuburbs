const load = require("./load")
const run = require("./run")
const write = require("./write")

const data = load()
const { types, states, cities, suburbs } = run(data)
write({ types, states, cities, suburbs })
console.log("[ Done ]")