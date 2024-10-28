// script.js

// Function to call the backend server and generate Facebook post suggestions
async function generatePost() {
    const url = document.getElementById('url').value;
    const language = document.getElementById('language').value;

    // Make sure this matches your server endpoint
    const apiUrl = 'http://localhost:5000/generate-post'; // Updated to include the endpoint

    const promptText = `Generate 2 to 5 engaging Facebook post suggestions in ${language === 'norsk' ? 'Norwegian' : 'English'} for this link: ${url}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, language })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data); // Log the full response data

        // Check if suggestions is an array and display it
        const suggestions = Array.isArray(data.suggestions) 
            ? data.suggestions.map(s => s.trim()).join("\n\n") // Trim each suggestion and join with two new lines
            : data.suggestions || "No suggestions generated.";

        document.getElementById('postOutput').innerText = suggestions;
    } catch (error) {
        console.error("Error fetching post suggestions:", error);
        document.getElementById('postOutput').innerText = "An error occurred while fetching suggestions.";
    }
}

// Function to copy the generated suggestions to the clipboard
function copyText() {
    const postText = document.getElementById('postOutput').innerText;
    navigator.clipboard.writeText(postText).then(() => {
        alert('Suggestions copied to clipboard!');
    });
}
