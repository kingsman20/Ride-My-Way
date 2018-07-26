const url = 'http://localhost:3000/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const ridesGiven = () => {
  fetch(`${url}/users/rides/given`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('ridesGiven', JSON.stringify(data));
    });
};

const ridesTaken = () => {
  fetch(`${url}/users/rides/taken`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('ridesTaken', JSON.stringify(data));
    });
};

const messages = () => {
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
        sessionStorage.setItem('notifications', JSON.stringify(data.data.length));
      } else {
        sessionStorage.setItem('notifications', '0');
      }
    });
};

const getRides = () => {
  if(!user) {
    window.location = './login.html';
  } else {
    ridesGiven();
    ridesTaken();
    messages();
    document.getElementById('username').innerHTML = user.data.name;
    document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
    const search = document.getElementById('search').value;

    fetch(`${url}/rides?search=${search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'No Ride Available') {
          document.getElementById('allRides').innerHTML = 'No ride available for this location or destination';
        } else if (data.data.rides.length > 0) {
          let rides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">More Details</th></tr></thead></tbody>';
          data.data.rides.map((ride) => {
            rides += `
            <tr>
              <td data-label="Location: &nbsp;">${ride.location}</td>
              <td data-label="Destination: &nbsp;">${ride.destination}</td>
              <td data-label="Date: &nbsp;">${ride.date}</td>
              <td data-label="More Details: &nbsp;" onclick="rideDetails(${ride.id})"><button class="btn button_1">details</button></td>
            </tr>
          `;
          });
          rides += '</tbody></table>';
          document.getElementById('allRides').innerHTML = rides;
        } else {
          document.getElementById('allRides').innerHTML = 'No ride offer available';
        }
      });
  }
};

const rideDetails = (rideId) => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
  fetch(`${url}/rides/${rideId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem('ride', JSON.stringify(data.data));
      window.location = 'ride_details.html';
    });
};

const getRideDetails = () => {
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');
  const ride = JSON.parse(sessionStorage.getItem('ride'));
  fetch(`${url}/users/${ride[0].userid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      document.getElementById('driver').innerHTML = data.data[0].name;
      document.getElementById('phone').innerHTML = data.data[0].phone;
    });

  document.getElementById('location').innerHTML = ride[0].location;
  document.getElementById('destination').innerHTML = ride[0].destination;
  document.getElementById('date').innerHTML = ride[0].date;
  document.getElementById('time').innerHTML = ride[0].time;
  document.getElementById('seats').innerHTML = ride[0].price;
  document.getElementById('rideId').value = ride[0].id;
};

const requestRide = () => {
  const location = document.getElementById('location').innerHTML;
  const destination = document.getElementById('destination').innerHTML;
  const date = document.getElementById('date').innerHTML;
  const rideId = document.getElementById('rideId').value;

  if(!user) {
    window.location = './login.html';
  } else {
    const requester = user.data.name;
    fetch(`${url}/rides/${rideId}/requests`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify({ location, destination, date, requester }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'failed') {
          document.getElementById('error').innerHTML = data.message;
          document.getElementById('success').innerHTML = '';
        } else {
          document.getElementById('success').innerHTML = data.message;
          document.getElementById('error').innerHTML = '';
        }
      });
  }
};

const createRideOffer = (event) => {
  event.preventDefault();
  const location = document.getElementById('location').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const seats = document.getElementById('seats').value;

  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;

  fetch(`${url}/rides`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify({ location, destination, date, time, seats }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        document.getElementById('success').innerHTML = data.message;
        document.getElementById('error').innerHTML = '';
      } else {
        document.getElementById('success').innerHTML = '';
        document.getElementById('error').innerHTML = data.message;
      }
    });
};

const authUser = () => {
  if(!user) {
    window.location = './login.html';
  }
  const ridesTaken = JSON.parse(localStorage.getItem('ridesTaken'));
  const ridesGiven = JSON.parse(localStorage.getItem('ridesGiven'));

  document.getElementById('username').innerHTML = user.data.name;
  document.getElementById('notify').innerHTML = sessionStorage.getItem('notifications');

  if (ridesTaken.message === 'No rides taken') {
    document.getElementById('ridesTaken').innerHTML = 0;
  } else {
    document.getElementById('ridesTaken').innerHTML = ridesTaken.message.length;
  }
  if (ridesGiven.message === 'No rides given') {
    document.getElementById('ridesGiven').innerHTML = 0;
  } else {
    document.getElementById('ridesGiven').innerHTML = ridesGiven.message.length;
  }
};

const rideOffersPage = () => {
  window.location = './dashboard.html';
};
