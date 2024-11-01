async function generatePost() {
    const response = await fetch('https://us-central1-kristiandrom-innlege-genrator.cloudfunctions.net/api/generate-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: 'https://example.com', language: 'no' })
    });
    
    if (!response.ok) {
        throw new Error('Error fetching post suggestions');
    }
    
    const data = await response.json();
    console.log(data.suggestions);
}
