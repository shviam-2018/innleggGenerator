// server.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json()); // Make sure to add this line

app.post('/generate-post', async (req, res) => {
    const { url, language } = req.body;

    const promptText = `Generate 2 to 5 engaging Facebook post suggestions in ${language === 'norsk' ? 'Norwegian' : 'English'} for this link: ${url}`;

    // Fetch suggestions from OpenAI API
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.openAi_API}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: promptText }],
                max_tokens: 150,
                n: 5, // Generates up to 5 suggestions
            }),
        });

        const data = await response.json();
        console.log("OpenAI Response:", data); // Log OpenAI API response

        // Ensure suggestions are in an array format before sending
        const suggestions = data.choices.map(choice => choice.message.content);
        res.json({ suggestions });
    } catch (error) {
        console.error("Error generating post suggestions:", error);
        res.status(500).json({ error: "An error occurred while generating post suggestions." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
