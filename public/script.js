async function generatePost() {
    const urlInput = document.getElementById('inputUrl'); // Use the correct ID for the URL input
    const languageInput = document.getElementById('language'); // Get the selected language
    const url = urlInput.value; // Get the URL value from the input field
    const language = languageInput.value; // Get the selected language value
    console.log('Generating post for URL:', url, 'and language:', language); // Debug log

    try {
        const response = await fetch('https://api-djti3myiqa-uc.a.run.app/generate-post',{      //https://api-djti3myiqa-uc.a.run.app/generate-post
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, language }), // Include the URL and language in the request body
        });

        console.log('Response status:', response.status); // Debug log for response status

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Generated Post Suggestions:', data.suggestions); // Debug log
        document.getElementById('postOutput').innerText = data.suggestions.join('\n'); // Output the suggestions
    } catch (error) {
        console.error('Error fetching post suggestions:', error);
        document.getElementById('postOutput').innerText = 'Error fetching post suggestions: ' + error.message;
    }
}

function copyText() {
    const outputText = document.getElementById('postOutput').innerText; // Get the text to copy
    navigator.clipboard.writeText(outputText).then(() => {
        alert('Suggestions copied to clipboard!'); // Success message
    }).catch(err => {
        console.error('Error copying text: ', err); // Error handling
    });
}
