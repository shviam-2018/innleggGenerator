// script.js

// Function to call the backend server and generate Facebook post suggestions
async function generatePost() {
    const url = document.getElementById('url').value;
    const language = document.getElementById('language').value;

    // Update the API URL to include the endpoint
    const apiUrl = 'http://localhost:5000/generate-post';

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
        const suggestions = data.suggestions.join("\n\n");

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
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
