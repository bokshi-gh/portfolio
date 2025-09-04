async function loadBlogPost() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("file");
    if (!fileName) {
      document.getElementById("container").innerHTML = "<p>No blog selected</p>";
      return;
    }

	// NOTE: If the filename contains '?' on GitHub, the `download_url` returned by GitHub
    // will have '%3F' instead of '?'. So if you fetch GitHub using the raw '?' character
    // in the URL, it will fail. Always encode the filename using `encodeURIComponent` before fetching.
	const encodedFileName = encodeURIComponent(fileName);
    const repoOwner = "bokshi-gh";
    const repoName = "portfolio";
    const fileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/blogs/${encodedFileName}`;

    const response = await fetch(fileUrl);

    if(!response.ok){
			document.getElementById("container").innerHTML = "Oops! This blog doesn’t seem to exist. It might have been deleted, migrated, or simply never existed.";
			return;
    }

    document.title = fileName;

    const content = await response.text();

    const lines = content.split("\n");
    const date = (lines[0]).trim();

    const bodyHtml = lines.slice(2).join("\n").trim();

    // Use file name as title
    const title = fileName

    document.getElementById("blog-title").innerText = title;
    document.getElementById("blog-date").innerText = date;
    document.getElementById("blog-content").innerHTML = bodyHtml;
  } catch (err) {
    console.error(err);
    document.getElementById("container").innerHTML = "<p>Error loading blog post :(</p>";
  }
}

loadBlogPost();
