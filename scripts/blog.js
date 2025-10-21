const blogTitle = document.getElementsByTagName("h2")[0];
const blogDate = document.getElementById("date");
const blogContent = document.getElementById("content");

blogDate.innerText = "fetching blog contents..."

const fetchBlog = async (linkTitle) => {
    const url = `https://raw.githubusercontent.com/bokshi-gh/portfolio/main/blogs/${linkTitle}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const raw = await response.text();
        const indexOfFirstCariageReturn = raw.indexOf("\r\n");
        const indexOfFirstDoubleCariageReturn = raw.indexOf("\r\n\r\n");

        const title = raw.slice(7, indexOfFirstCariageReturn);
        document.title = title + " | " + "Rajesh Thapa";
        const date = raw.slice(indexOfFirstCariageReturn + 7, indexOfFirstDoubleCariageReturn);
        const content = raw.slice(indexOfFirstDoubleCariageReturn + 4, raw.length);

        blogDate.innerText = "";

        blogTitle.innerText = title;
        blogDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i>` + date;
        blogContent.innerHTML = content;
    } catch (error) {
        blogDate.innerText = "";
        blogDate.innerText = `Failed to fetch Blog contents\r\nEither the blog you are trying to find was deleted/migrated or simply didn't existed\r\n${error}`;
        console.error('Failed to fetch Blog:', error);
    }

}

const url = document.URL;
const indexOfTitleQueryParameter = url.indexOf("title=");
const linkTitle = url.slice(indexOfTitleQueryParameter + 6, url.length);

fetchBlog(linkTitle);