let container = document.getElementsByClassName("container");

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
    console.log(blog)
    if (blog) {
      
      container.innerHTML = `
        <h1>${blog.title}</h1>
        <p class="blog-date"><em>${blog.date}</em></p>
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

