
let updateRow = null;
var numberOfColoumns = document.getElementById('myTable').rows[0].cells.length;
var myTable = document.getElementById("myTable");


function createRowFunction() {
	
	var row = myTable.insertRow(myTable.rows.length);

	submitNewRowFunction();
	updateRow = row.rowIndex;
	for (var i = 0; i<numberOfColoumns+2; i++){
		if (i<numberOfColoumns) {
			var cell = row.insertCell(i);
			cell.innerHTML = "<input type='text' class='form-input'>";
		}
		else {
			if (i === numberOfColoumns) {
				var cell6 = row.insertCell(numberOfColoumns);
				cell6.style.borderWidth = 0;
				cell6.innerHTML = "<button class='btn btn-block' onclick='myDeleteFunction(this)'>delete</button>";
			}
			if (i === numberOfColoumns +1) {
				var cell7 = row.insertCell(numberOfColoumns+1);
				cell7.style.borderWidth = 0;
				cell7.innerHTML = "<button class='btn btn-submit' onclick='submitRowFunction(this)' style='display:block;' id='submitBtn'>submit</button><button class='btn btn-update' id='updateBtn' onclick='updateRowFunction(this)' style='display:none;'>update</button>";
			}
		}
	}
	
}

function submitNewRowFunction() {
	if (updateRow) {
		let inputs = myTable.rows.item(updateRow).getElementsByTagName("input");
		let submitButton = myTable.rows.item(updateRow).getElementsByClassName("btn btn-submit");
		let updateButton = myTable.rows.item(updateRow).getElementsByClassName("btn btn-update");
		for(let i = 0; i < inputs.length; i++) {
			inputs[i].readOnly = true;
		}
		for (let i = 0; i<submitButton.length; i++){
			submitButton[i].style.display = "none";
			updateButton[i].style.display = "block";
		}
	}
}

function submitRowFunction(td) {
	if (updateRow) {
		let currentRowIndex = td.parentElement.parentElement.rowIndex;
		let inputs = myTable.rows.item(currentRowIndex).getElementsByTagName("input");
		let submitButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-submit");
		let updateButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-update");
		for(let i = 0; i < inputs.length; i++) {
			inputs[i].readOnly = true;
		}
		for (let i = 0; i<submitButton.length; i++){
			submitButton[i].style.display = "none";
			updateButton[i].style.display = "block";
		}
	}
}


function updateRowFunction(td) {
	let currentRowIndex = td.parentElement.parentElement.rowIndex;
	let inputs = myTable.rows.item(currentRowIndex).getElementsByTagName("input");
	let image = myTable.rows.item(currentRowIndex).getElementsByTagName("input");
	let submitButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-submit");
	let updateButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-update");

	for(let i = 0; i < inputs.length; i++) {
		if (inputs) {
		inputs[i].readOnly = false;
		}
		else if (image) {
			image[i].readOnly = false;
		}

	}



	for (let i = 0; i<submitButton.length; i++){

		submitButton[i].style.display = "block";
		updateButton[i].style.display = "none";
	}
}


function myDeleteFunction(td) {
	if (myTable.rows.length > 1) {
		var item = td.parentElement.parentElement;
		updateRow -= 1;
		table.deleteRow(item.rowIndex);
	}
}


document.getElementById('fileImport').addEventListener('change', readFileAsString);

function readFileAsString() {
	updateRow = 0;
	var files = this.files;
	var table = document.getElementById("myTable");
	if (files.length === 0) {
		console.log('No file is selected');
		return;
	}

	var reader = new FileReader();
	reader.onload = function(event) {
		var response =  JSON.parse(event.target.result);
		var data = response.data;
		for (let i = 0; i < data.length; i++) {
			var row = table.insertRow(table.rows.length);
			valueOfFile = Object.values(data[i]);
			for (let k = 0; k<numberOfColoumns+2; k++) {
				if (k<numberOfColoumns) {
				var cell = row.insertCell(k);
				if (String(valueOfFile[k]).startsWith("http")){
					cell.innerHTML = "<input type='image' src="+ String(data[i].avatar)+" width='35' height='35' readonly>";
				}
				else {
					cell.innerHTML = "<input type='text' class='form-input' value="+String(valueOfFile[k])+" readonly>";
				}
			}
			else {
			if (k === numberOfColoumns) {
				var cell6 = row.insertCell(numberOfColoumns);
				cell6.style.borderWidth = 0;
				cell6.innerHTML = "<button class='btn btn-block' onclick='myDeleteFunction(this)'>delete</button>";
			}
			if (k === numberOfColoumns +1) {
				var cell7 = row.insertCell(numberOfColoumns+1);
				cell7.style.borderWidth = 0;
				cell7.innerHTML = "<button class='btn btn-submit' onclick='submitRowFunction(this)' style='display:none;' id='submitBtn'>submit</button><button class='btn btn-update' id='updateBtn' onclick='updateRowFunction(this)' style='display:block;'>update</button>";
			}
		}
			}
			
			updateRow += 1;

			document.getElementById("fileImport").value = "";

		}
	};
	reader.readAsText(files[0]);
}


