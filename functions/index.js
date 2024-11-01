import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || functions.config().openai.key; // Use functions.config() if you're setting it in Firebase

const app = express();
app.use(cors()); // Enable all CORS requests
app.use(express.json());

app.post('/generate-post', async (req, res) => {
    const { url, language } = req.body;  // Extracting url and language from request body
    const promptText = `Bruk det konkrete innholdet på følgende URL: ${url} Lag en oppsummerende, engasjerende delingstekst til Facebook som gjør at folk får lyst til å åpne linken.`;

    try {
        // Call your custom API
        const response = await fetch('https://api-djti3myiqa-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`, // Assuming your custom API needs this
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4', // If necessary, include this in your request to your custom API
                messages: [{ role: 'user', content: promptText }],
                max_tokens: 150,
            }),
        });

        // Handle the response from your custom API
        const data = await response.json();

        // Check if the response contains choices
        if (!data.choices || data.choices.length === 0) {
            return res.status(404).json({ error: 'No suggestions found.' });
        }

        const suggestions = data.choices.map((choice) => choice.message.content);
        res.json({ suggestions }); // Send the suggestions back to the client
    } catch (error) {
        console.error('Error generating post suggestions:', error);
        res.status(500).json({ error: 'An error occurred while generating post suggestions.' });
    }
});

// Add a CORS preflight handler for OPTIONS requests
app.options('/generate-post', cors());

export const api = functions.https.onRequest(app);
