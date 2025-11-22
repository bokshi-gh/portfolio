const main = document.getElementsByTagName("main")[0];

const fetchBlog = async (data) => {
    main.innerText = "";
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
                <div class="blog">
                    <a href="blog.html?title=${linkTitle}">${title}</a>
                    <span><i class="fa-solid fa-calendar-days"></i> ${date}</span>
                </div>
            `

            main.insertAdjacentHTML("afterend", element);
        } catch (error) {
            main.innerText = `Failed to fetch Blogs\r\n${error}`;
            console.error('Failed to fetch Blog:', error);
        }
    }
}

const fetchBlogs = async () => {
    const url = "https://api.github.com/repos/bokshi-gh/portfolio/contents/blogs"

    try {
        main.innerText = "fetching blogs...";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        fetchBlog(data);
    } catch (error) {
        main.innerText = "";
        main.innerText = `Failed to fetch Blogs\r\n${error}`;
        console.error('Failed to fetch Blogs:', error);
    }
}

fetchBlogs();