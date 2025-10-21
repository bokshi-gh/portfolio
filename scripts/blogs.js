const blogList = document.getElementById("blog-list");

const fetchBlog = async (data) => {
    for (blog of data) {
        try {
            const response = await fetch(blog.download_url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const raw = await response.text();
            const splitedData = raw.split("\r\n");

            console.log(raw.slice(splitedData[0].length + splitedData[2].length, raw.length))

            let element = `
            
                <a href="/pages/blog.html?title=${blog.name}">
                    <p>${splitedData[0]}</p>
                    <span>${splitedData[2]}</span>
                </a>

            `

            blogList.innerHTML += element;
        } catch (error) {
            console.error('Failed to fetch Blog:', error);
        }
    }
}

const fetchBlogs = async () => {
    const url = "https://api.github.com/repos/bokshi-gh/portfolio/contents/blogs"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        fetchBlog(data);
    } catch (error) {
        console.error('Failed to fetch Blogs:', error);
    }
}

fetchBlogs();