window.addEventListener("load", function(e) {
	console.log("Doc Loaded");
	inti();
});

function inti() {
	
	document.getElementById("lookup").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("Button Clicked");
		var mtnId = document.showByIdForm.mid.value;
		console.log(mtnId);
		if (!isNaN(mtnId) && mtnId > 0) {
			getSingleMtn(mtnId);
		}
	});

	document.getElementById("showAll").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("All Mtn Button Clicked");
		getAllMtn(); // TODO write getAllMtn method
	});
	
	document.getElementById("submitAddMtn").addEventListener("click", function(e) {
		e.preventDefault();
		console.log("Add Mtn Button Clicked");
		addMtn(); // TODO write addMtn method
	});

	
}

function getSingleMtn(mtnId){
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/mountains/' + mtnId, true);
	console.log(mtnId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mountain = JSON.parse(xhr.responseText);
			console.log(mountain);
			display(mountain); // TODO write display method
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send();
}

function getAllMtn(){
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'api/mountains/', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mountains = JSON.parse(xhr.responseText);
			console.log(mountains);
			displayAll(mountains); // TODO write displayAll mountains method
		}
		
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};
	
	xhr.send();
}

function addMtn(){
	let xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'api/mountains/create', true);
	
	xhr.setRequestHeader("Content-type", "application/json");
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var newMountain = JSON.parse(xhr.responseText);
			console.log(newMountain);
			display(newMountain); // TODO write display mountains method
		}
		
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
		
	
	};
	let form  = document.addMtnForm;
	let newMtn = {
			name: form.name.value,
			visited: form.visited.value,
			location: form.location.value,
			rating: form.rating.value,
			description: form.description.value
	}
	xhr.send(JSON.stringify(newMtn));
}

function display(mountain){
	var mtnDiv = document.getElementById("mtnData");
	mtnDiv.textContent= " ";
	
	let nameH2 = document.createElement("h2");
	nameH2.textContent = mountain.name;
	mtnDiv.appendChild(nameH2);
	
	let visitedLi = document.createElement("li");
	visitedLi.textContent = mountain.visited;
	mtnDiv.appendChild(visitedLi);
	
	let locationLi = document.createElement("li");
	locationLi.textContent = mountain.location;
	mtnDiv.appendChild(locationLi);
	
	let ratingLi = document.createElement("li");
	ratingLi.textContent = mountain.rating;
	mtnDiv.appendChild(ratingLi);
	
	let descriptionLi = document.createElement("li");
	descriptionLi.textContent = mountain.description;
	mtnDiv.appendChild(descriptionLi);
	
}

function displayAll(mountains){
	var mtnDiv = document.getElementById("mtnData");
	mtnDiv.textContent= " ";
	
	let table = document.createElement("table");
	mtnDiv.appendChild(table);
	
	mountains.forEach(function(mountain, index) {
		let tr = document.createElement("tr");
		let td = document.createElement("td");
		
		td.textContext = mountain.name;
		tr.appendChild(td);
		
		let nameH2 = document.createElement("h2");
		nameH2.textContent = mountain.name;
		mtnDiv.appendChild(nameH2);
		
		td.textContext = mountain.visited;
		tr.appendChild(td);
		
		let visitedLi = document.createElement("li");
		visitedLi.textContent = mountain.visited;
		mtnDiv.appendChild(visitedLi);
		
		td.textContext = mountain.location;
		tr.appendChild(td);
		
		let locationLi = document.createElement("li");
		locationLi.textContent = mountain.location;
		mtnDiv.appendChild(locationLi);
		
		td.textContext = mountain.rating;
		tr.appendChild(td);
		
		let ratingLi = document.createElement("li");
		ratingLi.textContent = mountain.rating;
		mtnDiv.appendChild(ratingLi);
		
		td.textContext = mountain.description;
		tr.appendChild(td);
		
		let descriptionLi = document.createElement("li");
		descriptionLi.textContent = mountain.description;
		mtnDiv.appendChild(descriptionLi);
	});
	
}
