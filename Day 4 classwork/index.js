import { load } from "cheerio";
import { utils, writeFile } from "xlsx";
import axios from "axios";

const data = [];
async function getData() {
  try {
    const response = await axios.get(
      "https://nirzon47.github.io/html-datasets/data-dataset.html",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const $ = load(response);
    $(".product-card").each((index, element) => {
      const product = {
        product_name: $(element).find(".product-name").text(),
        price: $(element).find(".price").text(),
        availability: $(element).find(".availability").text(),
        product_rating: $(element).find(".product-rating").text(),
      };

      data.push(product);
    });
    console.log(data);
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    console.log(worksheet);
    utils.book_append_sheet(workbook, worksheet, "Sheet");
    writeFile(workbook, "productData.xlsx");
  } catch (error) {
    console.log(error);
  }
}
getData();
