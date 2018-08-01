const url = 'https://still-basin-40207.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const getUserProfile = () => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('name').value = user.data.name;
  document.getElementById('email').value = user.data.email;
  document.getElementById('phone').value = user.data.phone;

  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
};

const updateUser = (event) => {
  event.preventDefault();
  const photo = document.getElementById('photo').files[0];
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  const formData = new FormData();
  formData.append('photo', photo);

  fetch(`${url}/users/update`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify({ name, email, phone, address }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('success').innerHTML = data.message;
    });
};
