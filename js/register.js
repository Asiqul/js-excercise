document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('regist-form');
  const alertMessage = document.getElementById('alert-message');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('conf-password').value;

    axios
      .post('http://localhost:4000/register', {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        alert(response.data.message);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alertMessage.innerHTML = error.response.data.message;
      });
  });
});
