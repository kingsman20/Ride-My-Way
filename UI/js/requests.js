const url = 'https://still-basin-40207.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('user'));

const getRideRequests = () => {
  if(!user) {
    window.location = './login.html';
  } else {
    document.getElementById('username').innerHTML = user.data.name;
    fetch(`${url}/users/rides`, {
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

const rideRequests = (rideId) => {
  const ride = parseInt(rideId, 10);
  document.getElementById('username').innerHTML = user.data.name;
  fetch(`${url}/users/rides/${ride}/requests`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem('requests', JSON.stringify(data));
      window.location = 'ride_requests.html';
    });
};

let rideId;
let requestId;
const rideRequestPage = () => {
  if(!user) {
    window.location = './login.html';
  }
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
  fetch(`${url}/users/rides/${rideId}/requests/${requestId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify({ status: response }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('responseStatus').innerHTML = data.message;
    });
};

const userLogout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = './index.html';
};
