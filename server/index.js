const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const cheerio = require("cheerio");

const urls = [
  "https://www.nike.com/gb/t/air-max-1-essential-shoes-bp49vb/FZ5808-105",
  // "https://www.nike.com/gb/t/air-max-1-shoes-xq6WBc/HM9936-001"
];

const fetchHTML = async () => {
  try {
    const data = await Promise.all(urls.map((url) => axios.get(url)));
    const scrapedData = await data.map((d) => d.data);
    return extractProducts(scrapedData);
  } catch (error) {
    throw error;
  }
}

const extractProducts = (htmls) => {
  const products = [];

  htmls.forEach((html) => {
    const $ = cheerio.load(html);
    const price = $("#price-container > [data-testid='currentPrice-container']").first().text().replace("£", "");
    const product = {
      title: $("#title-container h1").text(),
      subtitle: $("#title-container h2").text(),
      image: $("[data-testid='HeroImg']").attr("src"),
      price: parseFloat(price)
    };

    products.push(product);
  })

  return products;
}

app.get("/api/scrapers", async (req, res) => {
  try {
    const data = await fetchHTML();
    res.json(data);
  } catch (error) {
    res.json({ message: `Failed URL: ${error?.config?.url}`})
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});