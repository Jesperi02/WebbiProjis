var consumerpriceindexTable = document.getElementById("consumerpriceindexTable");

if (consumerpriceindexTable) {
	getConsumerpriceIndex();
} else {
	console.error("consumerpriceindexTable elementtiä ei löydetty!");
}	

async function getConsumerpriceIndex() {
	const response = await fetch("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/khi/statfin_khi_pxt_11xb.px");
	const jsonData = await response.json();
	console.log(jsonData);

	let head = consumerpriceindexTable.childNodes[0];
	let body = consumerpriceindexTable.childNodes[1];

	let trhead = document.createElement("tr");

	//let th1
}