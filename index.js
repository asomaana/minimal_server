
const express = require("express");
const app = express();

const VERIFY_TOKEN = "asim-zill-12345";

app.use(express.json());

// مسار افتراضي للرئيسية عشان ما يطلع Error من Vercel
app.get("/", (req, res) => {
  res.send("🔥 Minimal Server is Alive!");
});

// التحقق من Webhook الخاص بـ Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// استقبال رسائل POST من WhatsApp API
app.post("/webhook", (req, res) => {
  console.log("Webhook POST received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Minimal server running on port 3000"));
