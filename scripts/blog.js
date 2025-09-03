let container = document.getElementById("container");

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadBlog() {
  const titleParam = getQueryParam('title');

  try {
    const response = await fetch('../jsons/blogs.json');
    const blogs = await response.json();

    const blog = blogs.find(b => b.title === titleParam);
    if (blog) {
      
      container.innerHTML = `
        <div class="blog-header">
		<h2>${blog.title}</h2>
		<p class="blog-date"><em>${blog.date}</em></p>
	</div>
        <main>${blog.content}</main>
      `;

    } else {
      container.innerHTML = `<p>Blog not found.</p>`;
    }
  } catch (err) {
    console.error(err);
  }
}

loadBlog();

