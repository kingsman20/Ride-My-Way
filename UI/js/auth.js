const url = 'http://localhost:3000/api/v1';

const loginUser = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data));
        window.location = './dashboard.html';
      } else {
        document.getElementById('error').innerHTML = data.message;
        document.getElementById('success').innerHTML = '';
      }
    });
};

const registerUser = (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  fetch(`${url}/auth/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, password, confirm }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.status === 'success') {
        sessionStorage.setItem('register', 'Registered Successfully. Login to continue');
        window.location = './login.html';
      } else {
        document.getElementById('error').innerHTML = data.message;
      }
    });
};

const checkRegistrationStatus = () => {
  const register = sessionStorage.getItem('register');
  if (register) {
    document.getElementById('success').innerHTML = sessionStorage.getItem('register');
    document.getElementById('error').innerHTML = '';
    sessionStorage.removeItem('register');
  } else {
    document.getElementById('success').innerHTML = '';
    document.getElementById('error').innerHTML = '';
  }
};
