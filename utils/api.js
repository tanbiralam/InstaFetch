// const axios = require('axios');
// const { parse } = require("node-html-parser");
import axios from "axios";
import parse from "node-html-parser";

async function getPostLink(url) {
  url = url + 'embed' + '/captioned';

  const response = await axios.get(url);
  const root = parse(response.data);
  
  let link = "";
  if (response.data.search("video_url") !== -1) {
    link = getVideoLinkFromHtml(response.data);
  } else {
    link = root.querySelector('img.EmbeddedMediaImage').getAttribute("src");
  }

  while (link.search("&amp;") !== -1) {
    link = link.replace("&amp;", "&");
  }

  const caption = await getCaptionFromHtml(response.data);

  return { link, caption };
}

async function getCaption(url) {
  url = url + 'embed' + '/captioned';
  const response = await axios.get(url);
  const caption = getCaptionFromHtml(response.data);
  return caption;
}

function getVideoLinkFromHtml(html) {
  let crop = `{"${html.substring(html.search("video_url"), html.search("video_url") + 1000)}`;
  crop = crop.substring(0, crop.search(",")) + "}";
  return JSON.parse(crop).video_url;
}

function getCaptionFromHtml(html) {
  const root = parse(html);
  let caption = root.querySelector('.Caption')?.text;
  if (caption === undefined) caption = "No caption";
  caption = caption.replace("view all comments", "");
  return caption;
}

export  {
  getPostLink,
  getCaption,
};
