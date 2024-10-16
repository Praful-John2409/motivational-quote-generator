# Motivational Quote Image Generator

### Description
This project is a serverless web application that allows users to generate custom motivational quote images. Users can select from a list of background images (e.g., nature, cityscape, sunset), and a motivational quote will be applied to the background dynamically. The application uses **AWS Lambda** for serverless computation and **Amazon S3** for image storage and retrieval. The Serverless Framework is used to manage and deploy the entire infrastructure.

### Features
- Select from predefined background images.
- Randomly generates motivational quotes.
- Dynamically generates images with quotes on the selected background.
- The generated images are stored and retrieved from Amazon S3.
- The entire application is serverless, leveraging AWS Lambda for the backend.
- Scalable, cost-efficient, and reliable infrastructure powered by AWS.

### Technologies Used
- **AWS Lambda**: To handle serverless computation.
- **Amazon S3**: For storing and retrieving images.
- **Serverless Framework**: For easy deployment and management of AWS resources.
- **Jimp (JavaScript Image Manipulation Program)**: To handle image manipulation, including adding text to images.
- **Node.js**: Backend programming language for the AWS Lambda function.

---

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: You need Node.js installed on your local machine. You can download it from [Node.js](https://nodejs.org/).
- **AWS Account**: You need an AWS account to deploy the Lambda functions and S3 storage.
- **Serverless Framework**: Install the Serverless Framework to easily deploy and manage the AWS infrastructure.
  
  Install Serverless Framework globally:
  ```bash
  npm install -g serverless
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Praful-John2409/motivational-quote-generator.git
   cd motivational-quote-generator
   ```

2. **Install the necessary dependencies:**
   ```bash
   npm install
   ```

### Deploying with Serverless Framework

The application is deployed using the Serverless Framework, which automates the process of deploying to AWS Lambda and setting up the necessary infrastructure like S3 and API Gateway.

1. **Configure AWS Credentials**:
   If you haven’t set up AWS credentials, follow these steps to configure them:
   ```bash
   serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
   ```

2. **Deploy the application:**
   ```bash
   serverless deploy
   ```

   Once the deployment is successful, you will see the API endpoint for the Lambda function in the console output. The endpoint will look something like this:
   ```
   Service deployed to stack motivational-quote-generator-dev
   endpoint: GET - https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/quotes
   functions:
     generateQuoteImage: motivational-quote-generator-dev-generateQuoteImage
   ```

### Running Locally

To run the application locally for testing before deploying to AWS, you can use **serverless-offline**:
1. Install the **serverless-offline** plugin:
   ```bash
   npm install serverless-offline --save-dev
   ```

2. Run the project locally:
   ```bash
   serverless offline
   ```

3. Open your browser and go to:
   ```
   http://localhost:3000
   ```

4. Test the functionality of the image generator with local Lambda function invocation.

---

## Usage

### Frontend
1. Visit the deployed API link provided after deployment.
2. On the web page, select a background from the dropdown (Nature, Cityscape, Sunset, etc.).
3. Click on "Generate Quote" to create an image with a randomly selected motivational quote.
4. The image with the quote will be generated and displayed on the page.
5. You can download or share the generated image from the given link.

### Backend (Lambda + S3)
- **Lambda Function**: Handles the generation of the image by applying a quote onto a background.
- **S3 Bucket**: Stores the background images and the generated images with quotes.

---

## Project Structure

```bash
motivational-quote-generator/
│
├── .serverless/               # Serverless deployment artifacts
├── css/                       # Styles for the frontend
│   └── styles.css
├── js/                        # Frontend JavaScript
│   └── app.js
├── motivational-quotes-images/ # Folder containing background images
│   ├── nature.jpeg
│   ├── cityscape.jpeg
│   └── sunset.jpeg
├── node_modules/              # Node.js modules
├── .gitignore                 # Files to be ignored by Git
├── handler.js                 # Lambda function logic for generating quote images
├── index.html                 # Frontend HTML
├── package.json               # Node.js dependencies and scripts
├── serverless.yml             # Serverless configuration file
└── README.md                  # Project documentation (this file)
```

---

## Artifacts

### 1. **Frontend (HTML/CSS/JavaScript)**
   - The frontend includes an HTML form where users can select a background and generate a custom quote image. The styling and interaction are handled by the following files:
     - **`index.html`**: Contains the structure of the web page.
     - **`css/styles.css`**: Contains the styling for the page.
     - **`js/app.js`**: Handles the interaction between the frontend and the backend (Lambda function).
   
### 2. **AWS Lambda Function (Node.js)**
   - The backend logic is implemented in **`handler.js`**. This file defines the Lambda function that generates the motivational quote images by using the Jimp library to manipulate the images.
   
### 3. **S3 Bucket (Storage)**
   - The S3 bucket stores the background images and generated images.
   
### 4. **Serverless Configuration**
   - **`serverless.yml`** contains the configuration for deploying the Lambda function and setting up the API Gateway and S3 bucket automatically.

### 5. **Generated Images**
   - All generated images are stored in the S3 bucket and are available via URLs. The generated images have motivational quotes applied to the selected background.


### Notes
- You can customize the list of motivational quotes in **`handler.js`**.
- Feel free to add new background images by uploading them to the **motivational-quotes-images** folder and redeploying.
