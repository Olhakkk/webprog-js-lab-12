let currentPage = 1;
const limit = 5;

async function fetchPosts(page, limit) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
  return await res.json();
}

async function loadMore() {
  const posts = await fetchPosts(currentPage, limit);
  const list = document.getElementById('postList');
  posts.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
    li.onclick = () => fetchComments(post.id, li);
    list.appendChild(li);
  });
  currentPage++;
}

function refreshPosts() {
  document.getElementById('postList').innerHTML = '';
  currentPage = 1;
  loadMore();
}

async function fetchComments(postId, element) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments = await res.json();
  const ul = document.createElement('ul');
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment.body;
    ul.appendChild(li);
  });
  element.appendChild(ul);
}
