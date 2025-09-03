let blogList = document.getElementById("blog-list");

async function loadBlog() {
  try {
    const repoOwner = "bokshi-gh";
    const repoName = "portfolio";
    const path = "blogs";

    // GitHub API to list all blog files
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const response = await fetch(apiUrl);
    const files = await response.json();

    if (Array.isArray(files)) {
      for (const file of files) {
        const content = await fetch(file.download_url).then(res => res.text());

        // Parse title, date, body safely
        const lines = content.split("\n");
        const title = (lines[0] || "").trim();
        const date = (lines[1] || "").trim();

        blogList.innerHTML += `
          <p>
            <a href="/blog.html?file=${file.name}">${title}</a> | ${date}
          </p>
        `;
      }
    } else {
      blogList.innerHTML = `<p>No blogs found.</p>`;
    }
  } catch (err) {
    console.error(err);
    blogList.innerHTML = `<p>Error loading blogs.</p>`;
  }
}

loadBlog();
