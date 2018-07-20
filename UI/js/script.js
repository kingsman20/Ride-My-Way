const url = 'https://still-basin-40207.herokuapp.com/api/v1';

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

const getRides = () => {
  if (sessionStorage.getItem('notify')) {
    document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  }
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  } else {
    const token = user.token;
    document.getElementById('username').innerHTML = user.data.name;
    fetch(`${url}/rides`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.rides.length > 0) {
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
  if (sessionStorage.getItem('notify')) {
    document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  }
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  document.getElementById('username').innerHTML = user.data.name;
  fetch(`${url}/rides/${rideId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('ride', JSON.stringify(data.data));
    });
  window.location = 'ride_details.html';
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

const createRideOffer = (event) => {
  event.preventDefault();
  const location = document.getElementById('location').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const seats = document.getElementById('seats').value;

  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  document.getElementById('username').innerHTML = user.data.name;

  fetch(`${url}/rides`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
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
  if (sessionStorage.getItem('notify')) {
    document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  }
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
};

const getRideDetails = () => {
   document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  document.getElementById('username').innerHTML = user.data.name;
  const ride = JSON.parse(localStorage.getItem('ride'));
  fetch(`${url}/users/${ride[0].userid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
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

  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  } else {
    const token = user.token;
    const requester = user.data.name;
    fetch(`${url}/rides/${rideId}/requests`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
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

const getRideRequests = () => {
  if (sessionStorage.getItem('notify')) {
    document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  }
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  } else {
    const token = user.token;
    document.getElementById('username').innerHTML = user.data.name;
    fetch(`${url}/users/rides`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'failed') {
          let yourRides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">Action</th></tr></thead></tbody>';
          data.data.map((ride) => {
            yourRides += `
            <tr>
              <td data-label="Location: &nbsp;">${ride.location}</td>
              <td data-label="Destination: &nbsp;">${ride.destination}</td>
              <td data-label="Date: &nbsp;">${ride.date}</td>
              <td data-label="Action: &nbsp;" onclick="rideRequests(${ride.id})"><button class="btn button_1">view requests</button></td>
            </tr>
        `;
          });
          yourRides += '</tbody></table>';
          document.getElementById('yourRides').innerHTML = yourRides;
        } else {
          document.getElementById('yourRides').innerHTML = data.message;
        }
      });
  }
};

const rideRequests = (rideId, location) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  const ride = parseInt(rideId, 10);
  document.getElementById('username').innerHTML = user.data.name;
  fetch(`${url}/users/rides/${ride}/requests`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem('requests', JSON.stringify(data));
    });
  window.location = 'ride_requests.html';
};

const rideOffersPage = () => {
  window.location = './dashboard.html';
};

let rideId;
let requestId;
const rideRequestPage = () => {
  if (sessionStorage.getItem('notify')) {
    document.getElementById('notify').innerHTML = JSON.parse(sessionStorage.getItem('notify'));
  }
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  document.getElementById('username').innerHTML = user.data.name;
  const requests = JSON.parse(sessionStorage.getItem('requests'));
  if (requests.status === 'failed') {
    document.getElementById('rideOfferRequests').innerHTML = 'No request for this ride';
  } else {
    let yourRequests = `<h4>${requests.data[0].location} to ${requests.data[0].destination} on ${requests.data[0].date}</h4><br><span id='responseStatus' class='success'></span><br><table><thead><tr><th scope="col">Requested By</th><th scope="col">Action</th></tr></thead></tbody>`;
    requests.data.map((ride) => {
      yourRequests += `
          <tr>
            <td data-label="Destination: &nbsp;">${ride.requester}</td>
            <td data-label="Action: &nbsp;"><button class="btn button_1" onclick="respondRequest('Accepted')">Accept</button>&nbsp;<button class="btn button_2" onclick="respondRequest('Rejected')">Reject</button></td>
          </tr>
      `;
      rideId = ride.rideid;
      requestId = ride.id;
    });
    yourRequests += '</tbody></table>';
    document.getElementById('rideOfferRequests').innerHTML = yourRequests;
  }
};

const respondRequest = (response) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  const token = user.token;
  fetch(`${url}/users/rides/${rideId}/requests/${requestId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ status: response }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('responseStatus').innerHTML = data.message;
    });
};

const notifications = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
  const token = user.token;
  fetch(`${url}/users/requests/notification`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length > 0) {
        sessionStorage.setItem('notify', JSON.stringify(data.data.length));
        document.getElementById('notify').innerHTML = data.data.length;
      }
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
    });
};

const userLogout = () => {
  localStorage.removeItem('user');
  window.location = './index.html';
};
