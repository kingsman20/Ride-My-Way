// Driver's Tab on dashboard
driverMenu = (evt, menu) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(menu).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Passenger's Tab on dashboard
passengerMenu = (evt, menu) => {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(menu).style.display = 'block';
  evt.currentTarget.className += ' active';
};

// logout function
logout = () => {
  window.location.href = 'index.html';
}

checkLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email + password);
  if (email.length < 1) {
    document.getElementById('error').innerHTML = '*Provide a valid email address';
  } else if (password.length < 6) {
    document.getElementById('error').innerHTML = '*Password must at be six digits';
  } else {
    document.getElementById('error').innerHTML = '';
    window.location.href = 'driver_page.html';
  }
}

checkRegister = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  if (name < 1) {
    document.getElementById('error').innerHTML = '*Provide a valid name';
  } else if (email.length < 3) {
    document.getElementById('error').innerHTML = '*Enter a valid email';
  } else if (password.length < 6) {
    document.getElementById('error').innerHTML = '*Password must be at least six digits';
  } else if(password != confirm) {
    document.getElementById('error').innerHTML = '*Password do not match';
  } else {
    document.getElementById('error').innerHTML = '';
    window.location.href = 'passenger_page.html';
  }
}