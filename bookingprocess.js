//XML request
var xhr = createRequest();

function getData(dataSource, divID, custname, phone, unitno, streetno, streetname, suburb, destination, pickupdate, pickuptime, ampm) {
	//Must validate form before processing
	if(validateForm()) {
		if(xhr) {
			//Div to store confirmation information
			var obj = document.getElementById(divID);
			//The variables to be passed to php file
			var requestbody =
			"custname="+encodeURIComponent(custname)+
			"&phone="+encodeURIComponent(phone)+
			"&unitno="+encodeURIComponent(unitno)+
			"&streetno="+encodeURIComponent(streetno)+
			"&streetname="+encodeURIComponent(streetname)+
			"&suburb="+encodeURIComponent(suburb)+
			"&destination="+encodeURIComponent(destination)+
			"&pickupdate="+encodeURIComponent(pickupdate)+
			"&pickuptime="+encodeURIComponent(pickuptime)+
			"&ampm="+encodeURIComponent(ampm);
			
			//POST to keep information secure
			xhr.open("POST", dataSource, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					obj.innerHTML = xhr.responseText;
				} // end if
			} // end anonymous call-back function
			xhr.send(requestbody);
		} // end if
	}
} // end function getData()

//Validators using js

//Checks if empty
function notEmpty(x, name) {
	//Make sure the status is not null or empty
	if (x == null || x == "") {
		alert(name + " must not be empty");
		return false;
	}
	return true;
}

//Checks if name, street or location is correct 
function validName(x, name) {
	//Match each character, only A-Z, a-z, spaces and dashes"
	if(x.match(/[^A-Za-z -]/g)) {
		alert(name + " can only contain letters and spaces");
		return false;
	}
	return true;
}

//Check if number is valid
function validNum(x, name) {
	//Match each character, only 0-9, dahses"
	if(x.match(/[^0-9/]/g)) {
		alert(name + " can only contain numbers");
		return false;
	}
	return true;
}

//Check if date is valid
function validDate(x) {
	//Matches to time format
	if(x.match(/[^\d{1,2}\/\d{1,2}\/\d{4}$]/)) {
		alert(x + " is invalid. Date should be formatted \'00/00/2015\'");
		return false;
	}
	return true;
}

//Check if time is valid
function validTime(x) {
	//Matches to time format
	if(x.match(/[^\d{1}\:\d{1,2}\$]/)) {
		alert(x + " is invalid. Time should be formatted 0:00'");
		return false;
	}
	return true;
}



function validateForm() {
	//Check customer name
	x = document.forms["booking"]["custname"].value;
	name = document.forms["booking"]["custname"].name;
	if(!notEmpty(x, name)) return false;
	if(!validName(x, name)) return false;
	
	//Check Phone number
	x = document.forms["booking"]["phone"].value;
	name = document.forms["booking"]["phone"].name;
	if(!notEmpty(x, name)) return false;
	if(!validNum(x, name)) return false;
	
	//Check unit number
	x = document.forms["booking"]["unitno"].value;
	name = document.forms["booking"]["unitno"].name;
	if(!validNum(x, name)) return false;
	
	//Check street number
	x = document.forms["booking"]["streetno"].value;
	name = document.forms["booking"]["streetno"].name;
	if(!notEmpty(x, name)) return false;
	if(!validNum(x, name)) return false;
	
	//Check Street name
	x = document.forms["booking"]["streetname"].value;
	name = document.forms["booking"]["streetname"].name;
	if(!notEmpty(x, name)) return false;
	if(!validName(x, name)) return false;
	
	//Check suburb
	x = document.forms["booking"]["suburb"].value;
	name = document.forms["booking"]["suburb"].name;
	if(!notEmpty(x, name)) return false;
	if(!validName(x, name)) return false;
	
	//Check destination suburb
	x = document.forms["booking"]["destination"].value;
	name = document.forms["booking"]["destination"].name;
	if(!notEmpty(x, name)) return false;
	if(!validName(x, name)) return false;
	
	//Check pick-up date
	x = document.forms["booking"]["pickupdate"].value;
	//Check if it is a valid date
	if(!validDate(x))
	{
		return false;
	}
	
	//Check pick-up time
	x = document.forms["booking"]["pickuptime"].value;
	//Check if it is a valid time
	if(!validTime(x))
	{
		return false;
	}
	
	return true;
	
}