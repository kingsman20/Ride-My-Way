const url = 'https://still-basin-40207.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const notifications = () => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  fetch(`${url}/users/requests/notification`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status !== 'failed') {
        sessionStorage.setItem('notify', JSON.stringify(data.data.length));
        document.getElementById('notify').innerHTML = data.data.length;
        let notifications = '<table><thead><tr><th scope="col">Status</th><th scope="col">Messages</th></tr></thead></tbody>';
    data.data.map((notify) => {
      notifications += `
          <tr>
            <td data-label="Status: &nbsp;"><span>${notify.status}</span></td>
            <td data-label="Messages: &nbsp;">Your request to join the ride from ${notify.location} to ${notify.destination} is ${notify.status}</td>
          </tr>
        `;
      });
      notifications += '</tbody></table>';
      document.getElementById('notifications').innerHTML = notifications;
      } else {
        document.getElementById('notifications').innerHTML = 'No new notifications';
      }
    });
};

const userLogout = () => {
	sessionStorage.clear();
  localStorage.clear();
  window.location = './index.html';
};
