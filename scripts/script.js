let blogList = document.getElementById("blog-list");

async function loadBlog(){
	try {
	    const response = await fetch('../jsons/blogs.json');
	    const blogs = await response.json();

	    if (blogs) {
	      
	      blogs.forEach(blog => {
				blogList.innerHTML += `
                
		<p><a href="/blog.html?title=${blog.title}">${blog.title}</a> | ${blog.date}</p>
	      `;
	      });
	    } else {
	      blogList.innerHTML = `<p>Blog not found.</p>`;
	    }
	  } catch (err) {
	    console.error(err);
	  }
}

loadBlog();
