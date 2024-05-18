const run = (data) => {
	console.log("=> Preparing data...")
	const types = {}
	const states = {}
	const cities = []
	const suburbs = []

	data.forEach((dataByState) => {
		const currentCities = {}

		dataByState.forEach((datum) => {
			if (!types[datum.d_tipo_asenta])
				types[datum.d_tipo_asenta] = {
					id: Object.keys(types).length + 1,
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

			if (!currentCities[datum.D_mnpio])
				currentCities[datum.D_mnpio] = {
					id: cities.length + Object.keys(currentCities).length + 1,
					name: datum.D_mnpio,
					code: datum.c_mnpio,
					state_id: states[datum.d_estado].id,
				}

			suburbs.push({
				id: suburbs.length + 1,
				name: datum.d_asenta,
				cp: datum.d_codigo,
				city_id: currentCities[datum.D_mnpio].id,
				type_id: types[datum.d_tipo_asenta].id,
			})
		})

		cities.push(...Object.values(currentCities))
	})

	return { types: Object.values(types), states: Object.values(states), cities, suburbs }
}

module.exports = run