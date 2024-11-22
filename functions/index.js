import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import functions from 'firebase-functions';

dotenv.config();

const app = express();
app.use(cors({ origin: true })); // Enable CORS with all origins allowed
app.use(express.json());

// Endpoint to handle incoming requests
app.post('/generate-post', async (req, res) => {
    const { url,language } = req.body;
    const promptText = `Lag en fengende delingstekst til Facebook på ${language === 'english' ? 'English' : 'Norsk'} basert på denne konteksten: ${url}.
    Teksten bør:
    Være kort og presis (maks 280 tegn)
    Vekke nysgjerrighet og interesse
    Være relevant for innholdet i artikkelen
    Ha fokus på Storhamar Hockey - da delingstekstens skal deles på Storhamars facebookside.
    Målet er å få folk til å klikke på lenken og lese hele artikkelen. Unngå åpenbare clickbait-taktikker, men fokuser på å formidle verdien av innholdet på en engasjerende måte.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: promptText }],
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            console.error('Response from OpenAI failed:', response.status, response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch data from OpenAI API' });
        }

        const data = await response.json();
        const suggestions = data.choices.map((choice) => choice.message.content);

        res.json({ suggestions });
    } catch (error) {
        console.error('Error generating post suggestions:', error.message, error.stack);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

// Export the `app` as a Firebase function
export const api = functions.https.onRequest(app);
