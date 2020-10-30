const fs = require("fs");
const path = require("path");
const https = require("https");
const fetch = require("node-fetch");
const queryString = require("query-string");
require("dotenv").config();

const isOk = (res) => {
  if (!res.ok) {
    console.log("exit");
    process.exit(1);
  }
  return res;
};

async function getPosts() {
  const owner = "eicxv";
  const repo = "journal";
  const folder = "posts";
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      accept: "application/vnd.github.v3.raw+json",
    },
  };
  const basePath = path.join("src", "data", "content", "posts");
  let response = await fetch(url, options).then(isOk);
  response = await response.json();
  for (let file of response) {
    let data = await fetch(file.url, options).then(isOk);
    data = await data.text();
    fs.writeFile(path.join(basePath, file.name), data, (err) => {
      if (err) process.exit(1);
    });
  }
}

async function getImages() {
  function saveImageToDisk(url, localPath) {
    const writeStream = fs.createWriteStream(localPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        writeStream.end();
        process.exit(1);
      }
      response.pipe(writeStream);
    });
  }

  const basePath = path.join("src", "data", "content", "images");
  const params = {
    method: "flickr.photos.search",
    api_key: process.env.FLICKR_API_KEY,
    user_id: process.env.FLICKR_USER_ID,
    format: "json",
    nojsoncallback: 1,
    per_page: 500,
    page: 1,
    extras: "original_format, url_o",
  };

  const getPage = async (page) => {
    params.page = page;
    const query = queryString.stringify(params);
    const url = `https://api.flickr.com/services/rest/?${query}`;
    let response = await fetch(url).then(isOk);
    response = await response.json();
    const photos = response.photos.photo;
    for (let photo of photos) {
      saveImageToDisk(
        photo.url_o,
        path.join(basePath, `${photo.title}.${photo.originalformat}`)
      );
    }
    if (response.photos.pages > page) {
      getPage(page + 1);
    }
  };
  getPage(1);
}

getPosts();
getImages();
