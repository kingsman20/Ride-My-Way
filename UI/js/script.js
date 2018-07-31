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
  const fileName = document.getElementById('photo').value;
  const idxDot = fileName.lastIndexOf('.') + 1;
  const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile === 'jpg' || extFile === 'jpeg' || extFile === 'png') {
    document.getElementById('error').innerHTML = '';
  } else {
    document.getElementById('photo').value = '';
    document.getElementById('error').innerHTML = 'Only jpg/jpeg and png files are allowed!';
  }
};

const userLogout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location = './index.html';
};
