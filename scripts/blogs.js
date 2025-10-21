const blogList = document.getElementById("blog-list");

const fetchBlog = async (data) => {
    blogList.innerText = "";
    for (blog of data) {
        try {
            const response = await fetch(blog.download_url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const raw = await response.text();
            const indexOfFirstCariageReturn = raw.indexOf("\r\n");
            const indexOfFirstDoubleCariageReturn = raw.indexOf("\r\n\r\n");

            const title = raw.slice(7, indexOfFirstCariageReturn);
            const date = raw.slice(indexOfFirstCariageReturn + 7, indexOfFirstDoubleCariageReturn);

            const linkTitle = blog.name;
            const element = `
                <a href="/pages/blog.html?title=${linkTitle}">
                    <p>${title}</p>
                    <span>${date}</span>
                </a>
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