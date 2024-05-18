const FileSystem = require("fs")

const write = ({ types, states, cities, suburbs }) => {
	console.log("=> Creating files...")
	FileSystem.writeFile("result/suburb_types.json", JSON.stringify(types), (error) => {
		if (error) throw error
	})
	FileSystem.writeFile("result/cities.json", JSON.stringify(cities), (error) => {
		if (error) throw error
	})
	FileSystem.writeFile("result/states.json", JSON.stringify(states), (error) => {
		if (error) throw error
	})
	FileSystem.writeFile("result/suburbs.json", JSON.stringify(suburbs), (error) => {
		if (error) throw error
	})
}

module.exports = write
