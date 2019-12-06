
let updateRow = null;

function createRowFunction() {
	var myTable = document.getElementById("myTable");
	var row = myTable.insertRow(myTable.rows.length);

	submitNewRowFunction();
	updateRow = row.rowIndex;
	
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "<input type='text' class='form-input'>";
	var cell2 = row.insertCell(1);
	cell2.innerHTML = "<input type='text' class='form-input'>";
	var cell3 = row.insertCell(2);
	cell3.innerHTML = "<input type='text' class='form-input'>";
	var cell4 = row.insertCell(3);
	cell4.innerHTML = "<input type='text' class='form-input'>";
	var cell5 = row.insertCell(4);
	cell5.innerHTML = "<input type='text' class='form-input'>";
	var cell6 = row.insertCell(5);
	cell6.style.borderWidth = 0;
	cell6.innerHTML = "<button class='btn btn-block' onclick='myDeleteFunction(this)'>delete</button>";
	var cell7 = row.insertCell(6);
	cell7.style.borderWidth = 0;
	cell7.innerHTML = "<button class='btn btn-submit' onclick='submitRowFunction(this)' style='display:block;' id='submitBtn'>submit</button><button class='btn btn-update' id='updateBtn' onclick='updateRowFunction(this)' style='display:none;'>update</button>";
}

function submitNewRowFunction() {
	var myTable = document.getElementById("myTable");
	console.log(updateRow)
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
	var myTable = document.getElementById("myTable");
	if (updateRow) {
		let currentRowIndex = td.parentElement.parentElement.rowIndex
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

	var myTable = document.getElementById("myTable");
		let currentRowIndex = td.parentElement.parentElement.rowIndex
		console.log(currentRowIndex)
		let inputs = myTable.rows.item(currentRowIndex).getElementsByTagName("input");
		let submitButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-submit");
		let updateButton = myTable.rows.item(currentRowIndex).getElementsByClassName("btn btn-update");

		console.log(inputs.length)
		for(let i = 0; i < inputs.length; i++) {
			inputs[i].readOnly = false;
		}



		for (let i = 0; i<submitButton.length; i++){
			
		submitButton[i].style.display = "block";
		updateButton[i].style.display = "none";
	}
	}


function myDeleteFunction(td) {
	var table = document.getElementById("myTable");
	if (table.rows.length > 1) {
		var item = td.parentElement.parentElement;
		updateRow -= 1;
		table.deleteRow(item.rowIndex);
	}
}

document.getElementById('fileImport').addEventListener('change', readFileAsString);
function readFileAsString() {
	updateRow = 0
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
			var cell1 = row.insertCell(0);
			cell1.innerHTML = "<input type='text' class='form-input' value="+String(data[i].name)+" readonly>";
			var cell2 = row.insertCell(1);
			cell2.innerHTML = "<input type='text' class='form-input' value="+ String(data[i].salary)+" readonly>";
			var cell3 = row.insertCell(2);
			cell3.innerHTML = "<input type='text' class='form-input' value="+ String(data[i].gender)+" readonly>";
			var cell4 = row.insertCell(3);
			cell4.innerHTML = "<input type='text' class='form-input' value="+ String(data[i].married)+" readonly>";
			var cell5 = row.insertCell(4);
			cell5.innerHTML = "<input type='text' class='form-input' value="+ String(data[i].avatar)+" readonly>";
			var cell6 = row.insertCell(5);
			cell6.style.borderWidth = 0;
			cell6.innerHTML = "<button class='btn btn-block' onclick='myDeleteFunction(this)'>delete</button>";
			var cell7 = row.insertCell(6);
			cell7.style.borderWidth = 0;
			cell7.innerHTML = "<button class='btn btn-submit' onclick='submitRowFunction(this)' style='display:none;'>submit</button><button class='btn btn-update' onclick='updateRowFunction(this)' style='display:block;'>update</button>";

			updateRow += 1

		}
	};
	reader.readAsText(files[0]);
}

