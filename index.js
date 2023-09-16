const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

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

      // Create an array to store extracted text
      const extractedText = [];

      // Iterate over the selected elements and extract their text
      textElements.each((index, element) => {
        const text = $(element).text().trim();
        // Push the extracted text into the array
        extractedText.push(text);
      });

      // Join the extracted text into a single string
      const textToWrite = extractedText.join('\n');

      // Define the file path where you want to save the text
      const filePath = 'extracted_text.txt';

      // Write the text to a .txt file
      fs.writeFile(filePath, textToWrite, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Text has been successfully saved to', filePath);
        }
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
