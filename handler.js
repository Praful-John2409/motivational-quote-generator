const AWS = require('aws-sdk');
const Jimp = require('jimp');
const s3 = new AWS.S3();

// List of motivational quotes
const quotes = [
    "Believe in yourself!",
    "You can do it!",
    "Dream big and dare to fail.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

module.exports.generateQuoteImage = async (event) => {
    const bucketName = process.env.BUCKET_NAME;

    const background = event.queryStringParameters && event.queryStringParameters.background;
    if (!background) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Background parameter is required' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Fetch the background image from S3
    const backgroundKey = `${background}.jpeg`;
    const backgroundImageBuffer = await getImageFromS3(bucketName, backgroundKey);

    // Read the image from the buffer using Jimp
    const backgroundImage = await Jimp.read(backgroundImageBuffer);

    // Resize the image to a consistent dimension
    const imageWidth = 1200;  // Set the desired width for a wide image
    const imageHeight = 630;  // Set the desired height
    backgroundImage.resize(imageWidth, imageHeight);  // Resize the image to fixed dimensions

    // Add the quote to the image
    const editedImage = await addQuoteToImage(backgroundImage, quote);

    const generatedImageKey = `generated/${Date.now()}.jpeg`;
    await uploadImageToS3(bucketName, generatedImageKey, editedImage);

    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${generatedImageKey}`;
    return {
        statusCode: 200,
        body: JSON.stringify({ imageUrl }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
};

const getImageFromS3 = async (bucket, key) => {
    const params = { Bucket: bucket, Key: key };
    const data = await s3.getObject(params).promise();
    return data.Body;  // Return the image buffer directly
};

const addQuoteToImage = async (image, quote) => {
    // Use a moderate font size between Jimp's small and large defaults
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);  // Use white font

    // Calculate the text width and height for centering the text
    const textWidth = Jimp.measureText(font, quote);
    const textHeight = Jimp.measureTextHeight(font, quote, image.bitmap.width);

    // Calculate x and y coordinates for centered text
    const x = (image.bitmap.width - textWidth) / 2;
    const y = (image.bitmap.height - textHeight) / 2;

    // Add the quote to the image (with word wrapping to fit within the image width)
    image.print(
        font,
        0,  // X-coordinate (start from the left)
        y,  // Y-coordinate (vertically center the text)
        {
            text: quote,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,  // Center the text horizontally
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE     // Center the text vertically
        },
        image.bitmap.width,  // Max width for the text
        image.bitmap.height  // Max height for the text
    );

    return image;
};

const uploadImageToS3 = async (bucket, key, image) => {
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const params = {
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg'
    };
    await s3.putObject(params).promise();
};
