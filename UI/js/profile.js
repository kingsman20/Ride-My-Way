const url = 'http://localhost:3000/api/v1';
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
