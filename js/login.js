document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const alertMessage = document.getElementById('alert-message');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios
      .post('http://localhost:4000/login', { email: email, password: password })
      .then((response) => {
        alert(response.data.message);
        window.location.href = 'dashboard.html';
        const token = response.data.data.token;
        const username = response.data.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('name', username);
      })
      .catch((error) => {
        alertMessage.innerHTML = error.response.data.message;
      });
  });
});
