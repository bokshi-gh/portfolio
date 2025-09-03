async function loadBlogPost() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("file");
    if (!fileName) {
      document.body.innerHTML = "<p>No blog selected.</p>";
      return;
    }

    const repoOwner = "bokshi-gh";
    const repoName = "portfolio";
    const fileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/blogs/${fileName}`;

    const content = await fetch(fileUrl).then(res => res.text());

    // Safe parser: title, date, body
    const lines = content.split("\n");
    const title = (lines[0] || "").trim();
    const date = (lines[1] || "").trim();

    // Skip blank lines after date
    let bodyStartIndex = 2;
    while (lines[bodyStartIndex] === "") {
      bodyStartIndex++;
    }
    const bodyHtml = lines.slice(bodyStartIndex).join("\n").trim();

    // Render into HTML
    document.getElementById("blog-title").innerText = title;
    document.getElementById("blog-date").innerText = date;
    document.getElementById("blog-content").innerHTML = bodyHtml;
  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<p>Error loading blog post.</p>";
  }
}

loadBlogPost();
