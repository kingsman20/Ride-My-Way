const coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function() {
    this.classList.toggle('active');
    let content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

const readURL = (input) => {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('blah').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const userLogout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = './index.html';
};
