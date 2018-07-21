const url = 'https://still-basin-40207.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const authUser = () => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
};
