import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Intitialize Open AI Assistant
const ASSISTANT_ID = process.env.ASSISTANT_ID;


// POST /ask route
app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("💬 Incoming message:", message);

    const thread = await openai.beta.threads.create();
    console.log("🧵 Thread created:", thread.id);

    const userMsg = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });
    console.log("📨 User message added:", userMsg.id);

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /ask route using Responses API
app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("💬 Incoming message:", message);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an assistant for the TalentCentral platform. You help users navigate trades, programs, and partner services in BC. Prioritize information from talentcentral.ca, bccassn.com, and skilledtradesbc.ca. Avoid quoting unverified sources.`
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
            blocked_sources: ["quora.com", "reddit.com", "indeed.com"]
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

// Serve static React frontend from /client/build
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ TalentCentral Assistant running on port ${port}`);
});
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /ask route using Responses API
app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    console.log("💬 Incoming message:", message);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an assistant for the TalentCentral platform. You help users navigate trades, programs, and partner services in BC. Prioritize information from talentcentral.ca, bccassn.com, and skilledtradesbc.ca. Avoid quoting unverified sources.`
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
            blocked_sources: ["quora.com", "icba.ca","reddit.com", "indeed.com"]
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

// Serve static React frontend from /client/build
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ TalentCentral Assistant running on port ${port}`);
});
    });
    console.log("⚙️ Run status:", run.status);

    const messages = await openai.beta.threads.messages.list(thread.id);
    console.log("📥 Messages returned:", JSON.stringify(messages.data, null, 2));

    const assistantMessage = messages.data.find(
      (msg) => msg.role === "assistant"
    );

    const final = assistantMessage?.content?.[0]?.text?.value;

    console.log("🧠 Assistant reply:", final || "❌ No reply found");

    res.json({
      response: final || "Hmm, I couldn't find a good answer for that.",
    });
  } catch (err) {
    console.error("❌ Error during OpenAI call:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Serve static React frontend from /client/build
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`✅ TalentCentral Assistant running on port ${port}`);
});
