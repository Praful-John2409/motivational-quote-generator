document.getElementById('generateButton').addEventListener('click', async function () {
    const background = document.getElementById('background').value;

    // Show loading message
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    // Make a request to the API to generate the quote image
    const imageUrl = await requestQuoteImage(background);

    // Hide loading message
    loadingDiv.style.display = 'none';

    // Display the generated image
    if (imageUrl) {
        const quoteImage = document.getElementById('quoteImage');
        quoteImage.src = imageUrl;
        quoteImage.style.display = 'block';
    }
});

async function requestQuoteImage(background) {
    const apiUrl = `https://p7v7wp97yi.execute-api.us-east-1.amazonaws.com/dev/quotes?background=${background}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.imageUrl;  // Return the image URL from the API response
    } catch (error) {
        console.error("Error fetching the image:", error);
        return null;
    }
}
