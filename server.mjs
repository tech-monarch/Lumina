import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("Lumina")); // Adjust this to match your folder name

// OpenAI API Key (replace YOUR_API_KEY with your actual key)
const OPENAI_API_KEY = "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"; // You can also keep this in an .env file

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (response.ok) {
            const botMessage = data.choices[0].message.content.trim();
            res.json({ message: botMessage });
        } else {
            console.error("OpenAI API Error:", data);
            res.status(500).json({ error: "Failed to get a response from OpenAI" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing the request" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
