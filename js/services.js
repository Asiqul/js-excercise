const token = localStorage.getItem('token');

addEventListener('DOMContentLoaded', () => {
  const addForm = document.getElementById('add-form');
  const delForm = document.getElementById('delete-form');

  if (!token) {
    window.location.href = 'index.html';
  }
  axios
    .get('http://localhost:4000/notes', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const data = response.data.data;
      noteList(data);
      setName();
    })
    .catch((error = {}));

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('item-name').value;
    const quantity = document.getElementById('quantity').value;

    axios
      .post(
        'http://localhost:4000/notes',
        {
          name: name,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert(response.data.message);
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  });

  delForm.addEventListener('submit', () => {
    axios.delete('http://localhost:4000/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
  });
});

const noteList = (data) => {
  const table = document.getElementById('table');
  const render = data.map((note) => {
    return (table.insertRow().innerHTML = `<tr><td class="border-2 border-slate-500">${
      note.name.charAt(0).toUpperCase() + note.name.slice(1)
    }</td><td class="border-2 border-slate-500">${note.quantity}</td></tr>`);
  });
};

const setName = () => {
  const nameWrapper = document.getElementById('name');
  const name = localStorage.getItem('name');
  nameWrapper.innerHTML = name.toUpperCase();
};
