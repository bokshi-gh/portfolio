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

            const indexOfFirstNewline = raw.indexOf("\n");
            const indexOfSecondNewline = raw.indexOf("\n\n");

            const title = raw.slice(7, indexOfFirstNewline);
            const date = raw.slice(indexOfFirstNewline + 7, indexOfSecondNewline);

            const linkTitle = blog.name;
            const element = `
                <div class="blog">
                    <a href="blog.html?title=${linkTitle}">${title}</a>
                    <span><i class="fa-solid fa-calendar"></i> ${date}</span>
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