check = (event) => {
  event.preventDefault();
  window.location = './dashboard.html';
};

getRides = () => {
  fetch('https://still-basin-40207.herokuapp.com/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTMwNjcyOTk3LCJleHAiOjE1MzA3NTkzOTd9.3BoBigJJGqeu3kn6WvXHl3A0xUhMFxNzdejh7vIOM0Y')
    .then((res) => res.json())
    .then((data) => console.log(data));
};
