loginFunc = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email);

  fetch('https://still-basin-40207.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ email: email, password:password })
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
