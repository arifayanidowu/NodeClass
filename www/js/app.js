(function() {

    var regForm = document.getElementById("register"),
        login = document.getElementById("login"),
        xhr = new XMLHttpRequest();

    regForm.addEventListener("submit", function(e) {

        e.preventDefault();

        var data = "",
            elements = this.elements;
        // call or apply is used when invoking a function indrectly
        Array.prototype.forEach.call(elements, function(v) {

            data += encodeURIComponent(v.name);
            data += "=";
            data += encodeURIComponent(v.value);
            data += "&";
        })

        data = data.substring(0, data.length-1);

        xhr.open("POST", "http://192.168.33.50:3000/api/v1/users");

        xhr.setRequestHeader("content-Type", "Application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            handleResponse(xhr);
        }

        xhr.send(data);

    }, false)


    function handleResponse(http) {
        if (http.readyState == 4) {
            if (http.status == 200 || http.status == 304) {
                var user = JSON.parse(http.responseText);

                if (user.hasOwnProperty("_token")) {
                    regForm.classList.toggle("hide");
                    login.classList.toggle("hide");
                }
            }
        }
    }

    login.addEventListener("submit", function(e) {
    	e.preventDefault();

    	var data = {},
    		elements = this.elements;

    	Array.prototype.forEach.call(elements, function(v){
    		data[encodeURIComponent(v.name)] = encodeURIComponent(v.value);
    	})

    	xhr.open("POST", "http://192.168.33.50:3000/api/v1/auth");

    	xhr.setRequestHeader("content-Type", "application/json");

    	xhr.onreadystatechange = function() {
    		manageResponse(xhr)
    	}

    	xhr.send(JSON.stringify(data));
    })

    	function manageResponse(http) {
    		if(http.readyState == 4) {
    			if(http.status == 200 || http.status == 304) {
    				var user = JSON.parse(http.responseText);

    				if(user.hasOwnProperty("_token")) {
    					localStorage.setItem("token", user._token)
    					window.location = "dashboard.html";
    				}
    			}
    		}
    	}

})()