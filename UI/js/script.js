check = (event) => {
  event.preventDefault();
  window.location = './dashboard.html';
};

getRides = () => {
  fetch('https://still-basin-40207.herokuapp.com/api/v1/rides?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJLaW5nc2xleSBNaWNoZWFsIiwiaWF0IjoxNTMwNzc5MTI0LCJleHAiOjE1MzA4NjU1MjR9.wKwd2jAd0wktlNTyZV76guJDqEyi0o6q9ICCpHproo4')
    .then((res) => res.json())
    .then((data) => console.log(data));
};
