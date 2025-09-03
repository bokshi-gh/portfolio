let blogList = document.getElementById("blog-list");

blogList.innerHTML = "<p>fetching blogs...</p>";

async function loadBlogList() {
  try {
    const repoOwner = "bokshi-gh";
    const repoName = "portfolio";
    const path = "blogs";

    // Get list of files in blogs folder
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const response = await fetch(apiUrl);
    const files = await response.json();

    if (Array.isArray(files)) {
      blogList.innerHTML = "";
      for (const file of files) {
        const content = await fetch(file.download_url).then(res => res.text());

        // Split by lines
        const lines = content.split("\n");

        const date = (lines[0]).trim();

        // Use filename as blog title
        const filename = file.name
        
        blogList.innerHTML += `
          <p>
            <a href="/blog.html?file=${file.name}">${filename}</a> | ${date}
          </p>
        `;
      }
    } else {
      blogList.innerHTML = "";
      blogList.innerHTML = `<p>Oops! No blogs found</p>`;
    }
  } catch (err) {
    console.error(err);
    blogList.innerHTML = "";
    blogList.innerHTML = `<p>Error loading blogs :(</p>`;
  }
}

loadBlogList();

// TODO: list latest blog at the top (this can be done by filtering the blog according to the date specified in the blog file)
