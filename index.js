var XLSX = require("xlsx")
const FileSystem = require("fs")

const run = async (data) => {
	console.log("=> Preparing data...")
	const tipos = {}
	const cities = {}
	const states = {}
	const suburbs = []
	data.forEach((datum, index) => {
		if (!tipos[datum.d_tipo_asenta])
			tipos[datum.d_tipo_asenta] = {
				id: Object.keys(tipos).length + 1,
				name: datum.d_tipo_asenta,
				code: datum.c_tipo_asenta,
			}
		if (!states[datum.d_estado])
			states[datum.d_estado] = {
				id: Object.keys(states).length + 1,
				name: datum.d_estado,
				code: datum.c_estado,
				country_id: 1,
			}
		if (!cities[datum.D_mnpio])
			cities[datum.D_mnpio] = {
				id: Object.keys(cities).length + 1,
				name: datum.D_mnpio,
				code: datum.c_mnpio,
				state_id: states[datum.d_estado].id,
			}
		suburbs.push({
			id: index + 1,
			name: datum.d_asenta,
			cp: datum.d_codigo,
			city_id: cities[datum.D_mnpio].id,
			type_id: tipos[datum.d_tipo_asenta].id,
		})
	})

	console.log("=> Creating files...")
	FileSystem.writeFile("result/suburb_types.json", JSON.stringify(tipos), (error) => {
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
	console.log("[ Done ]")
}

const load = () => {
	console.log("=> Loading file...")
	const wb = XLSX.readFile("CPdescarga.xls")
	console.log("=> Transforming data...")
	let data = []
	wb.SheetNames.forEach(function (sheetName) {
		if (sheetName === "Nota") return null
		const oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName])
		data = [ ...data, ...oJS ]
	})
	run(data)
}

load()
