async function loadUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.id}: ${user.name}`;
      list.appendChild(li);
    });
  }
  
  async function fetchUserById(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error("Користувача не знайдено");
    return await res.json();
  }
  
  async function getUserById() {
    const id = document.getElementById('userId').value;
    const output = document.getElementById('userData');
    try {
      const user = await fetchUserById(id);
      output.textContent = JSON.stringify(user, null, 2);
    } catch (error) {
      output.textContent = error.message;
    }
  }
  