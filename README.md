# Innlegg Generator

A web application designed to generate engaging social media posts for Facebook based on provided article links and languages. Built with Firebase, Express.js, and OpenAI's GPT-4 API.

## Overview

This project allows users to input a URL and select a language (English or Norwegian). It then generates a concise, attention-grabbing social media post suitable for sharing on Facebook.

## Live Demo

Check out the live version here:  
[Innlegg Generator](https://kristiandrom-innlege-genrator.web.app/)

## Features

- Generate social media posts in either English or Norwegian.
- Uses OpenAI's GPT-4 to create relevant and engaging content.
- Simple and user-friendly interface.
- Firebase-hosted backend for handling requests securely.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Firebase CLI
- OpenAI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/innlegg-generator.git
   cd innlegg-generator
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Firebase functions:** Navigate to the ***functions*** directory and
   install dependencies:
   ```bash
   cd functions
   npm install
   ```
4. **Configure environment variables:** Set your OpenAI API key:
   ```bash
   firebase functions:config:set openai.apikey="YOUR_OPENAI_API_KEY"
   ```
5. **Deploy the Firebase functions:**
   ```bash
   firebase deploy --only functions
   ```
6. **Start the development server locally** you can use the live server extention from vs code or
   ```bash
   firebase server
   ```

   ### Project Structure
   ```bash
   innlegg-generator/
   ├── public/             # Frontend files (HTML, CSS, JavaScript)
   │   ├── index.html      # Main HTML file
   │   └── script.js       # Client-side JavaScript
   ├── functions/          # Backend Firebase functions
   │   ├── index.js        # Express server and API endpoints
   │   └── package.json    # Function dependencie
   └── .firebaserc         # Firebase project configuration
    ```

###Contributing
Pull requests are welcome! Please ensure any new features or fixes are well-documented and tested.

###License
This project is licensed under the MIT [License](LICENSE). See the LICENSE file for more details.
