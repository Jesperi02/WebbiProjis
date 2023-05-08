const queryData = {
	"query": [
	  	{
			"code": "Kuukausi",
			"selection": {
				"filter": "item",
				"values": [
					"2020M01",
					"2020M02",
					"2020M03",
					"2020M04",
					"2020M05",
					"2020M06",
					"2020M07",
					"2020M08",
					"2020M09",
					"2020M10",
					"2020M11",
					"2020M12",
					"2021M01",
					"2021M02",
					"2021M03",
					"2021M04",
					"2021M05",
					"2021M06",
					"2021M07",
					"2021M08",
					"2021M09",
					"2021M10",
					"2021M11",
					"2021M12",
					"2022M01",
					"2022M02",
					"2022M03",
					"2022M04",
					"2022M05",
					"2022M06",
					"2022M07",
					"2022M08",
					"2022M09",
					"2022M10",
					"2022M11",
					"2022M12",
					"2023M01",
					"2023M02",
					"2023M03"
		  		]
			}
	  	},
	  	{
			"code": "Hyödyke",
			"selection": {
				"filter": "item",
				"values": [
					"0"
				]
			}
	  	},
		{
			"code": "Tiedot",
			"selection": {
				"filter": "item",
				"values": [
					"indeksipisteluku",
					"vuosimuutos",
					"kuukausimuutos"
				]
			}
		}
	],
	"response": {
	  "format": "json-stat2"
	}
}

var consumerpriceindexTable = document.getElementById("consumerpriceindexTable");
if (consumerpriceindexTable) {
	getConsumerpriceIndex(consumerpriceindexTable);
} else {
	console.error("consumerpriceindexTable elementtiä ei löydetty!");
}	

async function getConsumerpriceIndex(table) {
	postData("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/khi/statfin_khi_pxt_11xb.px", queryData).then((data) => {
		console.log(data); // JSON data parsed by `data.json()` call

		// Arvot
		let monthObj = data.dimension.Kuukausi;
		let dataObj = data.dimension.Tiedot;
		let dataLabels = dataObj.category.label;
		let monthKeys = Object.keys(monthObj.category.index);
		let monthValues = monthObj.category.label;
		let dataValues = data.value;
		let dataColCount = data.size.length;

		// Taulukon header ja body
		let head = document.createElement("thead");
		let body = document.createElement("tbody");
	
		// Otsikko
		let headRow1 = document.createElement("tr");
		let headCell1 = document.createElement("th");
		headCell1.innerText = data.label;
		headCell1.colSpan = dataColCount + 1; // data columnit ja kuukaudet
		headRow1.appendChild(headCell1);
	
		// Toinen otsikko rivi
		let headRow2 = document.createElement("tr");
		let headCell2 = document.createElement("th");
		headCell2.innerText = monthObj.label;
		headRow2.appendChild(headCell2);
		
		for (let key in dataLabels) {
			let headCellData = document.createElement("th");
			headCellData.innerText = dataLabels[key];
			headRow2.appendChild(headCellData);
		}

		// lisää osat
		head.appendChild(headRow1);
		head.appendChild(headRow2);

		// Keho
		for (let i = data.size[0] - 1; i >= 0; i--) {
			let row = document.createElement("tr");

			// Kuukausi
			let monthCell = document.createElement("th");
			monthCell.innerText = monthValues[monthKeys[i]];
			row.appendChild(monthCell);

			// Arvot
			let dataIndexBegin = i * 3;
			for (let j = dataIndexBegin; j < dataIndexBegin + dataColCount; j++) {
				let dataCell = document.createElement("th");
				dataCell.innerText = dataValues[j]
				row.appendChild(dataCell);
			}

			body.appendChild(row);
		}

		// Lisää osat
		table.appendChild(head);
		table.appendChild(body);
	});
}

async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	return response.json(); // parses JSON response into native JavaScript objects
}