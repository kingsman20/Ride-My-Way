const url = 'https://still-basin-40207.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const notifications = () => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
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

const history = () => {
  const ridesGiven = JSON.parse(localStorage.getItem('ridesGiven'));
  const ridesTaken = JSON.parse(localStorage.getItem('ridesTaken'));
  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
  document.getElementById('username').innerHTML = user.data.name;

  if (ridesTaken.message === 'No rides taken') {
    document.getElementById('ridesTaken').innerHTML = 'No ride taken';
  } else {
    let rides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">More Details</th></tr></thead></tbody>';
    ridesTaken.message.map((ride) => {
      rides += `
            <tr>
              <td data-label="Location: &nbsp;">${ride.location}</td>
              <td data-label="Destination: &nbsp;">${ride.destination}</td>
              <td data-label="Date: &nbsp;">${ride.date}</td>
              <td data-label="Date: &nbsp;">${ride.time}</td>
            </tr>
        `;
    });
    rides += '</tbody></table>';
    document.getElementById('ridesTaken').innerHTML = rides;
  }

  if (ridesGiven.message === 'No rides given') {
    document.getElementById('ridesGiven').innerHTML = 'No rides given';
  } else {
    let rides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">More Details</th></tr></thead></tbody>';
    ridesGiven.message.map((ride) => {
      rides += `
            <tr>
              <td data-label="Location: &nbsp;">${ride.location}</td>
              <td data-label="Destination: &nbsp;">${ride.destination}</td>
              <td data-label="Date: &nbsp;">${ride.date}</td>
              <td data-label="Date: &nbsp;">${ride.time}</td>
            </tr>
        `;
    });
    rides += '</tbody></table>';
    document.getElementById('ridesGiven').innerHTML = rides;
  }
};

const userLogout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = './index.html';
};
