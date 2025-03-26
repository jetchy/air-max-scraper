const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const urls = [
  "https://www.nike.com/gb/t/air-max-1-essential-shoes-bp49vb/FZ5808-105",
  "https://www.nike.com/gb/t/air-max-1-shoes-wzTkdh/HF8127-100",
  // "undefined"
  
];

const fetchHTML = async () => {
  const htmlData = urls.map(async (url) => {
    try {
      const { data } = await axios.get(url);
      const html = await data;
      return { data: html, url }
    } catch (err) {
      return { data: null, url }
    }
  });

  const allHtml = await Promise.all(htmlData);

  return extractProducts(allHtml);
}

const extractProducts = (htmls) => {
  const html = htmls.map(({ data, url }) => {
    if (data) {
      const $ = cheerio.load(data);
      const price = $("#price-container > [data-testid='currentPrice-container']").first().text().replace("£", "");
      return {
        title: $("#title-container h1").text(),
        subtitle: $("#title-container h2").text(),
        image: $("[data-testid='HeroImg']").attr("src"),
        price: parseFloat(price),
        url
      };
    } else {
      return { 
        title: null,
        subtitle: null,
        image: null,
        price: null,
        url
       }
    }
  })

  return html;
}

app.use(cors());

app.get("/api/scrapers", async (req, res) => {
  try {
    const data = await fetchHTML();
    res.json(data);
  } catch (err) {
    console.error(err)
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});