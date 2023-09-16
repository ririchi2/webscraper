const axios = require('axios');
const cheerio = require('cheerio');

// Replace 'your_website_url_here' with the URL of the client's website
const websiteUrl = 'your_website_url_here';

// Make an HTTP request to the website
axios.get(websiteUrl)
  .then(response => {
    if (response.status === 200) {
      // Load the HTML content into Cheerio for parsing
      const $ = cheerio.load(response.data);

      // Select the HTML elements containing the text you want to extract
      const textElements = $('p, h1, h2, h3, h4, h5, h6, span, div'); // Adjust this selector as needed

      // Iterate over the selected elements and extract their text
      textElements.each((index, element) => {
        const text = $(element).text().trim();
        // You can now store or process the extracted text as needed
        console.log(text);
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
