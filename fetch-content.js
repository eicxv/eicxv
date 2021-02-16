const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");
const fetch = require("node-fetch");
const queryString = require("query-string");
require("dotenv").config();

async function main() {
  createFolder(path.join("content", "posts"));
  createFolder(path.join("content", "images"));
  getPosts();
  getImages();
}

const isOk = (res) => {
  if (!res.ok) {
    process.exit(1);
  }
  return res;
};

function createFolder(folder) {
  fs.mkdirSync(folder, { recursive: true }, (err) => {
    if (err) process.exit(1);
  });
}

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
  const basePath = path.join("content", "posts");
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
  function createOauthSignature(method, url, params) {
    function sortParams(params) {
      let p = {};
      for (const key of Object.keys(params).sort()) {
        p[key] = params[key];
      }
      return p;
    }

    let secret = `${process.env.FLICKR_API_SECRET}&${process.env.FLICKR_OAUTH_TOKEN_SECRET}`;
    let paramsString = queryString.stringify(sortParams(params));
    let baseStr = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
      paramsString
    )}`;
    var signature = crypto
      .createHmac("sha1", secret)
      .update(baseStr)
      .digest("base64");

    return signature;
  }

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

  const basePath = path.join("content", "images");
  const params = {
    method: "flickr.photos.search",
    oauth_nonce: crypto.randomBytes(16).toString("base64"),
    oauth_consumer_key: process.env.FLICKR_API_KEY,
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
    oauth_token: process.env.FLICKR_OAUTH_TOKEN,
    user_id: process.env.FLICKR_USER_ID,
    format: "json",
    nojsoncallback: 1,
    per_page: 500,
    page: 1,
    extras: "original_format, url_o",
  };

  const getPage = async (page) => {
    params.page = page;
    const baseUrl = `https://api.flickr.com/services/rest`;
    const signature = createOauthSignature("GET", baseUrl, params);
    params.oauth_signature = signature;
    const query = queryString.stringify(params);
    const url = `${baseUrl}?${query}`;
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

main();
