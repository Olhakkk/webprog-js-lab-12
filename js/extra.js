let currentPage = 1;
const limit = 5;

async function fetchPosts(page, limit) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
  return await res.json();
}

async function fetchComments(postId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return await res.json();
}

async function displayComments(postId, container) {
  const comments = await fetchComments(postId);
  const div = document.createElement('div');
  div.className = 'comments';

  div.innerHTML = `<strong>Коментарі:</strong><ul>${comments
    .map(c => `<li><strong>${c.name}</strong>: ${c.body}</li>`)
    .join('')}</ul>`;

  container.appendChild(div);
}

async function displayPosts() {
  const posts = await fetchPosts(currentPage, limit);
  const container = document.getElementById('postContainer');
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button onclick="loadComments(${post.id}, this)">Показати коментарі</button>
    `;
    container.appendChild(postDiv);
  });
}

function reloadPosts() {
  currentPage = 1;
  const container = document.getElementById('postContainer');
  container.innerHTML = '';
  displayPosts();
}

function loadComments(postId, button) {
  const postDiv = button.parentElement;
  button.disabled = true;
  displayComments(postId, postDiv);
}

async function fetchPhotos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
  const photos = await res.json();
  const container = document.getElementById('photoContainer');
  container.innerHTML = '';

  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/150?random=${photo.id}`;
    img.alt = photo.title;
    container.appendChild(img);
  });
}

// Стартова ініціалізація
reloadPosts();
fetchPhotos();
