async function generatePost(url) {
    try {
        const response = await fetch('https://api-djti3myiqa-uc.a.run.app/generate-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Generated Post Suggestions:', data.suggestions);
        document.getElementById('postOutput').innerText = data.suggestions.join('\n');
    } catch (error) {
        console.error('Error fetching post suggestions:', error);
        document.getElementById('postOutput').innerText = 'Error fetching post suggestions: ' + error.message;
    }
}
