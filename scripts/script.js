let blogsContainer = document.getElementById("blogs");

async function loadBlog(){
	try {
	    const response = await fetch('../jsons/blogs.json');
	    const blogs = await response.json();
            console.log(blogs)

	    if (blogs) {
	      
	      blogs.forEach(blog => {
				blogsContainer.innerHTML += `
                
		<p><a href="/?title=${blog.title}">${blog.title}</a> | ${blog.date}</p>
	      `;
	      });
	    } else {
	      blogsContainer.innerHTML = `<p>Blog not found.</p>`;
	    }
	  } catch (err) {
	    console.error(err);
	  }
}

loadBlog();
