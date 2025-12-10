const blogList = document.getElementsByClassName("blog-list")[0];

const fetchBlog = async (data) => {
    blogList.innerText = "";

    for (blog of data) {
        try {
            const response = await fetch(blog.download_url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let raw = await response.text();
            raw = raw.replace(/\r\n/g, "\n");

	    let lines = raw.split('\n');
            const title = lines[0].slice(7);
            const date = lines[1].slice(6);
            const tag = lines[2].slice(5);

            const linkTitle = blog.name;
            const element = `
                <div class="blog">
                    <a href="blog.html?title=${linkTitle}">${title}</a>
		    <div class="date-and-tag">
	                <span><i class="fa-solid fa-calendar"></i> ${date}</span>
			|
			<span>${tag}</span>
		    </div>
                </div>
            `

            blogList.innerHTML += element;
        } catch (error) {
            blogList.innerText = `Failed to fetch Blogs\r\n${error}`;

            console.error('Failed to fetch Blog:', error);
        }
    }
}

const fetchBlogs = async () => {
    const url = "https://api.github.com/repos/bokshi-gh/portfolio/contents/blogs"

    try {
        blogList.innerText = "fetching blogs...";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        fetchBlog(data);
    } catch (error) {
        blogList.innerText = "";
        blogList.innerText = `Failed to fetch Blogs\r\n${error}`;

        console.error('Failed to fetch Blogs:', error);
    }
}

fetchBlogs();
