var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var queryData = {
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
};
var consumerpriceindexTable = document.getElementById("consumerpriceindexTable");
if (consumerpriceindexTable) {
    getConsumerpriceIndex(consumerpriceindexTable);
}
else {
    console.error("consumerpriceindexTable elementtiä ei löydetty!");
}
function getConsumerpriceIndex(table) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            postData("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/khi/statfin_khi_pxt_11xb.px", queryData).then(function (data) {
                console.log(data); // JSON data parsed by `data.json()` call
                // Arvot
                var monthObj = data.dimension.Kuukausi;
                var dataObj = data.dimension.Tiedot;
                var dataLabels = dataObj.category.label;
                var monthKeys = Object.keys(monthObj.category.index);
                var monthValues = monthObj.category.label;
                var dataValues = data.value;
                var dataColCount = data.size.length;
                // Taulukon header ja body
                var head = document.createElement("thead");
                var body = document.createElement("tbody");
                // Otsikko
                var headRow1 = document.createElement("tr");
                var headCell1 = document.createElement("th");
                headCell1.innerText = data.label;
                headCell1.colSpan = dataColCount + 1; // data columnit ja kuukaudet
                headRow1.appendChild(headCell1);
                // Toinen otsikko rivi
                var headRow2 = document.createElement("tr");
                var headCell2 = document.createElement("th");
                headCell2.innerText = monthObj.label;
                headRow2.appendChild(headCell2);
                for (var key in dataLabels) {
                    var headCellData = document.createElement("th");
                    headCellData.innerText = dataLabels[key];
                    headRow2.appendChild(headCellData);
                }
                // lisää osat
                head.appendChild(headRow1);
                head.appendChild(headRow2);
                // Keho
                for (var i = data.size[0] - 1; i >= 0; i--) {
                    var row = document.createElement("tr");
                    // Kuukausi
                    var monthCell = document.createElement("th");
                    monthCell.innerText = monthValues[monthKeys[i]];
                    row.appendChild(monthCell);
                    // Arvot
                    var dataIndexBegin = i * 3;
                    for (var j = dataIndexBegin; j < dataIndexBegin + dataColCount; j++) {
                        var dataCell = document.createElement("th");
                        dataCell.innerText = dataValues[j];
                        row.appendChild(dataCell);
                    }
                    body.appendChild(row);
                }
                // Lisää osat
                table.appendChild(head);
                table.appendChild(body);
            });
            return [2 /*return*/];
        });
    });
}
function postData(url, data) {
    if (url === void 0) { url = ""; }
    if (data === void 0) { data = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify(data), // body data type must match "Content-Type" header
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()]; // parses JSON response into native JavaScript objects
            }
        });
    });
}
//# sourceMappingURL=index.js.map