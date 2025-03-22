const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const fetchHTML = async () => {
  try {
    // const data = await Promise.all(urls.map((url) => axios.get(url)));
    // const result = await data.json();
    // return result
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
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

fetchHTML();

// const jsonFilePath = path.join(__dirname, 'data', 'products.json');

// const saveToJSON = (data) => {
//   fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
//   console.log("Saved data to JSON file");
// }

// const urls = [
//   "https://www.nike.com/gb/t/air-max-1-essential-shoes-bp49vb/FZ5808-105",
//   "https://www.nike.com/gb/t/air-max-1-shoes-xq6WBc/HM9936-001"
// ];

// const urls = [
//   "https://jsonplaceholder.typicode.com/todos/1"
// ]

// const html = fetchHTML(urls);

// return html.then((data) => {
//   console.log(data);
//   // const allHTML = data.map((d) => d.data);
//   // return JSON.stringify(extractProducts(allHTML));
// });