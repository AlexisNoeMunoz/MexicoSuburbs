const XLSX = require("xlsx")

const load = () => {
	console.log("=> Loading file...")
	const wb = XLSX.readFile("CPdescarga.xls")
	console.log("=> Transforming data...")
	const data = []
	wb.SheetNames.forEach(function (sheetName) {
		if (sheetName === "Nota") return null
		const oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName])
		data.push(oJS)
	})
	return data
}

module.exports = load