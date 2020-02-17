window.addEventListener("load", function(e) {
	console.log("Doc Loaded");
	init();
});

function init() {

	document.getElementById("lookup").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("Button Clicked");
		var mtnId = document.showByIdForm.mid.value;
		console.log(mtnId);
		if (!isNaN(mtnId) && mtnId > 0) {
			getSingleMtn(mtnId);
		}
	});

	document.getElementById("submitUpdateMtn").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("Update Button Clicked");
		var mtnId = document.updateMtnForm.mid.value;
		console.log(mtnId);
		if (!isNaN(mtnId) && mtnId > 0) {
			console.log(mtnId);
			updateMtn(mtnId);
		}
	});

	document.getElementById("showAll").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("All Mtn Button Clicked");
		getAllMtn(); 
	});

	document.getElementById("submitAddMtn").addEventListener("click", function(e) {
				e.preventDefault();
				console.log("Add Mtn Button Clicked");
				addMtn();
			});

	document.getElementById("delete").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("Delete Mtn Button Clicked");
		var mtnId = document.deleteByIdForm.mid.value;
		console.log(mtnId);
		if (!isNaN(mtnId) && mtnId > 0) {
			deleteSingleMtn(mtnId);
		}
	});
}



function getSingleMtn(mtnId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/mountains/' + mtnId, true);
	console.log(mtnId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mountain = JSON.parse(xhr.responseText);
			display(mountain);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}


function getAllMtn() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/mountains/', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mountains = JSON.parse(xhr.responseText);
			console.log(mountains);
			displayAll(mountains);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send();
}

function deleteSingleMtn(mtnId) {
	let xhr = new XMLHttpRequest();
	
	xhr.open('DELETE', 'api/mountains/delete/' + mtnId, true);
	console.log(mtnId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mountain = JSON.parse(xhr.responseText);
			display(mountain);
		}
		
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};
	
	xhr.send(null);
}

function addMtn() {
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'api/mountains/create', true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var newMountain = JSON.parse(xhr.responseText);
			console.log(newMountain);
			display(newMountain); 
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}

	};
	
	let form = document.addMtnForm;
	let newMtn = {
		name : form.name.value,
		visited : form.visited.value,
		location : form.location.value,
		rating : form.rating.value,
		description : form.description.value
	}
	
	xhr.send(JSON.stringify(newMtn));
}

function updateMtn(mtnId) {

	var xhr = new XMLHttpRequest();
	console.log(mtnId);

	xhr.open('PUT', 'api/mountains/update/' + mtnId, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	console.log(mtnId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status < 400) {
			var newMountain = JSON.parse(xhr.responseText);
			console.log(newMountain);
			display(newMountain);
		} if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}
	let form = document.updateMtnForm;
	
	let newMtn = {
		name : form.name.value,
		visited : form.visited.value,
		location : form.location.value,
		rating : form.rating.value,
		description : form.description.value
	}
	xhr.send(JSON.stringify(newMtn));
}

function display(mountain) {
	
	if(mountain.id === NaN){
	var mtnDiv = document.getElementById("mtnData");
	mtnDiv.textContent = " ";
	
	let nameH2 = document.createElement("h2");
	nameH2.textContent = "Mountain Name: " +  mountain.name;
	mtnDiv.appendChild(nameH2);
	
	let idLi = document.createElement("li");
	idLi.textContent = "ID: " +  mountain.id;
	mtnDiv.appendChild(idLi);

	let locationLi = document.createElement("li");
	locationLi.textContent = "Location: " + mountain.location;
	mtnDiv.appendChild(locationLi);

	let ratingLi = document.createElement("li");
	ratingLi.textContent = "Rating: " + mountain.rating;
	mtnDiv.appendChild(ratingLi);

	let visitedLi = document.createElement("li");
	visitedLi.textContent = "Visited: " + mountain.visited;
	mtnDiv.appendChild(visitedLi);
	
	let descriptionLi = document.createElement("li");
	descriptionLi.textContent = "Description: " + mountain.description;
	mtnDiv.appendChild(descriptionLi);
	} 
	else {
		
		var mtnDiv = document.getElementById("mtnData");
		mtnDiv.textContent = " ";
		
		let presH2 = document.createElement("h2");
		presH2.textContent = "Mountain Not Present";
		mtnDiv.appendChild(presH2);
		
		console.log("Empty");
	}

}

function displayAll(mountains) {
	var mtnDiv = document.getElementById("mtnData");
	mtnDiv.textContent = " ";

	let table = document.createElement("table");
	mtnDiv.appendChild(table);

	mountains.forEach(function(mountain) {
		let tr = document.createElement("tr");
		let td = document.createElement("td");

		td.textContext = mountain.name;
		tr.appendChild(td);

		let nameH2 = document.createElement("h2");
		nameH2.textContent = "Mountain Name: " + mountain.name;
		mtnDiv.appendChild(nameH2);
		
		td.textContext = mountain.id;
		tr.appendChild(td);
		
		let idLi = document.createElement("li");
		idLi.textContent = "ID: " + mountain.id;
		mtnDiv.appendChild(idLi);

		td.textContext = mountain.location;
		tr.appendChild(td);

		let locationLi = document.createElement("li");
		locationLi.textContent = "Location: " + mountain.location;
		mtnDiv.appendChild(locationLi);

		td.textContext = mountain.rating;
		tr.appendChild(td);

		let ratingLi = document.createElement("li");
		ratingLi.textContent = "Rating: " +mountain.rating;
		mtnDiv.appendChild(ratingLi);
		
		td.textContext = mountain.visited;
		tr.appendChild(td);

		let visitedLi = document.createElement("li");
		visitedLi.textContent = "Visited: " +mountain.visited;
		mtnDiv.appendChild(visitedLi);

		td.textContext = mountain.description;
		tr.appendChild(td);

		let descriptionLi = document.createElement("li");
		descriptionLi.textContent = "Description: " +mountain.description;
		mtnDiv.appendChild(descriptionLi);
		

	});

}
