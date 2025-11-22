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

        let raw = await response.text();
        raw = raw.replace(/\r\n/g, "\n");

        const indexOfFirstNewline = raw.indexOf("\n");
        const indexOfSecondNewline = raw.indexOf("\n\n");

        const title = raw.slice(7, indexOfFirstNewline);
        document.title = title + " | " + "Rajesh Thapa";

        const date = raw.slice(indexOfFirstNewline + 7, indexOfSecondNewline);
        const content = raw.slice(indexOfSecondNewline + 2, raw.length);

        blogDate.innerText = "";

        blogTitle.innerText = title;
        blogDate.innerHTML = `<i class="fa-solid fa-calendar"></i>` + date;
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