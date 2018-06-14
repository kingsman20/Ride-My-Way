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
}

// Register function
register = () => {
	window.location.href = "driver_page.html";
}