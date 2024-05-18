const load = require("./load")
const run = require("./run")
const write = require("./write")

const data = load()

const { types, states, cities, suburbs } = run(data)

console.log("=> Verifying suburbs...")
if (data.flat().length === suburbs.length) {
	console.log("=> Verified [✓]")
} else {
	throw Error("Data not matches")
}

write({ types, states, cities, suburbs })

console.log("[ Done ]")
