// Enables the Register button if values are valid
enableRegister = () => {
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let type = document.getElementById('type').value;
	let password = document.getElementById('password').value;
	let confirm = document.getElementById('confirm').value;

	if(name == "" || email == "" || type == "" || password == "" || confirm == ""){
		document.getElementById('submit').disabled = true;
		document.getElementById('password_error').innerHTML = '';
	} else {
		if(password != confirm){
			document.getElementById('submit').disabled = true;
			document.getElementById('password_error').innerHTML = 'Password do NOT match';
		} else {
			document.getElementById('password_error').innerHTML = '';
			document.getElementById('submit').disabled = false;
		}
	}
	// Calls the check name function 
	this.check_name(name);
	this.check_password(password);
}

// Register function
register = () => {
	window.location.href = "driver_page.html";
}

// Validates user's full name using regular expression
check_name = (name) => {
	if (/^[a-zA-Z ]+$/.test(name)){
		document.getElementById('name_error').innerHTML = '';
		document.getElementById('submit').disabled = false;
	} else {
		document.getElementById('name_error').innerHTML = 'Invalid Name';
		document.getElementById('submit').disabled = true;
	}
}

// Checks the validity of password
check_password = (password) => {
	if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
		document.getElementById('pass_error').innerHTML = '';
		document.getElementById('submit').disabled = false;
	} else {
		document.getElementById('pass_error').innerHTML = 'Password Must NOT be less than six digits with at least a number';
		document.getElementById('submit').disabled = true;
	}
}

// Enables Login if login form is valid
enableLogin = () => {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	if(email == "" || password == ""){
		document.getElementById('login').disabled = true;
	} else {
		document.getElementById('login').disabled = false;
	}
}

// login
signin = () => { 
	window.location.href = "driver_page.html";
}

// Driver's Tab on dashboard
driverMenu = (evt, menu) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(menu).style.display = "block";
    evt.currentTarget.className += " active";
}

// Passenger's Tab on dashboard
passengerMenu = (evt, menu) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(menu).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// logout function
logout = () => {
	window.location.href = "index.html";
}