// JavaScript Document
var xhr = createRequest();

function assignTaxi(dataSource, divID, refnum) {
	
		if(xhr) {
			
			//Find div to work on
			var obj = document.getElementById(divID);
			
			//Pass reference nubmer
			var requestbody  ="refnum="+encodeURIComponent(refnum);
			//POST to keep information secure
			xhr.open("POST", dataSource, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					obj.innerHTML = xhr.responseText;// to let us see the state of the computation
					//Get table information again
					getRequest('requests.php', 'targetDiv');
				} // end if
			} // end anonymous call-back function
			xhr.send(requestbody);
		} // end if
} // end function getData()



function getRequest(dataSource, divID) {
		if(xhr) {
			
			//Find div to work on
			var obj = document.getElementById(divID);
			
			//POST to keep information secure
			xhr.open("POST", dataSource, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					obj.innerHTML = xhr.responseText;// to let us see the state of the computation
					
				} // end if
			} // end anonymous call-back function
			xhr.send();
		} // end if
	
} // end function getData()