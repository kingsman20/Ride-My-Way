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
        let rides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">More Details</th></tr></thead></tbody>';
        data.data.rides.map((ride) => {
          rides += `
          <tr>
            <td data-label="Location">${ride.location}</td>
            <td data-label="Destination">${ride.destination}</td>
            <td data-label="Date">${ride.date}</td>
            <td data-label="More Details" onclick="rideDetails(${ride.id})"><button class="btn button_1">details</button></td>
          </tr>
      `;
        });
        rides += '</tbody></table>';
        document.getElementById('allRides').innerHTML = rides;
      });
  }
};

const rideDetails = (rideId) => {
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
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) {
    window.location = './login.html';
  }
  document.getElementById('username').innerHTML = user.data.name;
};

const getRideDetails = () => {
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

const getRideRequests = () => {
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
        console.log(data);
        if (data.status !== 'failed') {
          let yourRides = '<table><thead><tr><th scope="col">Location</th><th scope="col">Destination</th><th scope="col">Date</th><th scope="col">Action</th></tr></thead></tbody>';
          data.data.map((ride) => {
            yourRides += `
            <tr>
              <td data-label="Location">${ride.location}</td>
              <td data-label="Destination">${ride.destination}</td>
              <td data-label="Date">${ride.date}</td>
              <td data-label="Action" onclick="rideRequests(${ride.id})"><button class="btn button_1">View Requests</button></td>
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

const rideRequests = (rideId) => {
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
      localStorage.setItem('requests', JSON.stringify(data));
    });
  window.location = 'ride_requests.html';
};

const requestRide = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const rideId = document.getElementById('rideId').value;
  fetch(`${url}/rides/${rideId}/requests`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': token,
    },
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
};

const rideOffersPage = () => {
  window.location = './dashboard.html';
};

const rideRequestPage = () => {
  
};

const addRidePage = () => {
  window.location = './rides.html';
};

const userLogout = () => {
  localStorage.removeItem('user');
  window.location = './index.html';
};
