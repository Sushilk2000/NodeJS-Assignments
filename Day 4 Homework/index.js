import axios from "axios";
import { load } from "cheerio";
import { utils, writeFile } from "xlsx";

const data = [];
const getData = async () => {
  try {
    const response = await axios.get(
      "https://www.indeed.com/jobs?q=data+scientist+%2420%2C000&l=New+York&start=10",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    const $ = load(response);

    $(".job-card").each((index, element) => {
      const product = {
        job_title: $(element).find(".job-title").text(),
        company_name: $(element).find(".company-name").text(),
        location: $(element).find(".location").text(),
        job_type: $(element).find(".job-type").text(),
        posted_date: $(element).find(".date").text(),
        description: $(element).find(".job-description").text(),
      };

      data.push(product);
    });
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    writeFile(workbook, "jobs.xlsx");
    console.log($);
  } catch (error) {
    console.log(error);
  }
};
getData();
