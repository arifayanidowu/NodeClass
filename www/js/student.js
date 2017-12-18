(function() {

	var addStudent = document.getElementById("addStudent"),
		viewStudent = document.getElementById("showStudents"),
		xhr = new XMLHttpRequest();

	addStudent.addEventListener("submit", function(e) {
		
		e.preventDefault()

		var data = "",
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v) {
			data += encodeURIComponent(v.name);
			data += "=";
			data += encodeURIComponent(v.value);
			data += "&";
		})

		data = data.substring(0, data.length-1);

		xhr.open("POST", "http://192.168.33.50:3000/api/v1/students")

		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

		xhr.onreadystatechange = function (){
			handleResponse(xhr)
		}
		xhr.send(data);

	}, false)

	function handleResponse(http) {
		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {
				var student = JSON.parse(http.responseText);

				if(student.hasOwnProperty("_token")) {
					addStudent.classList.toggle("hide");
					viewStudent.classList.toggle("hide");
				}

			}
		}
	}

})()