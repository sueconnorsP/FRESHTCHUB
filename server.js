import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

// Load environment variables
dotenv.config();

// Setup Express app
const app = express();
const port = process.env.PORT || 3000;

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI with API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /ask — main assistant route
app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("💬 Incoming message:", message);
 return;

    // 🔒 Real OpenAI call (restore once ready)
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an assistant for the TalentCentral platform. 
You help users navigate trades, programs, and partner services in BC. 
Prioritize information from talentcentral.ca, bccassn.com, and skilledtradesbc.ca. 
Avoid quoting unverified sources. Do not refer to uploaded files or private documents.`
        },
        {
          role: "user",
          content: message
        }
      ],
      tools: [
        {
          type: "web_search",
          config: {
            preferred_sources: [
              "talentcentral.ca",
              "bccassn.com",
              "skilledtradesbc.ca"
            ],
            blocked_sources: [
              "quora.com",
              "reddit.com",
              "indeed.com",
              "icba.ca"
            ]
          }
        }
      ],
      tool_choice: "auto"
    });

    const reply = response.choices?.[0]?.message?.content;

    console.log("🧠 Assistant reply:", reply || "❌ No reply found");

    res.json({
      response: reply || "Sorry, no useful answer was returned."
    });
  } catch (err) {
    console.error("❌ Error during OpenAI call:", err);
    res.status(500).json({ error: "Server error during assistant call." });
  }
});

// Serve static frontend (React app)
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`✅ TalentCentral Assistant running on port ${port}`);
});
