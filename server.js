const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- API: health ---
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Portfolio API running' });
});

// --- API: contact form ---
// Stores messages in contacts.json (simple file-based inbox, no email service needed)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are all required.' });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long (max 5000 chars).' });
  }

  const entry = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    date: new Date().toISOString(),
  };

  const inboxPath = path.join(__dirname, 'contacts.json');
  let inbox = [];
  try {
    if (fs.existsSync(inboxPath)) {
      inbox = JSON.parse(fs.readFileSync(inboxPath, 'utf8') || '[]');
    }
  } catch (e) {
    inbox = [];
  }
  inbox.push(entry);
  fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2));

  console.log(`[contact] ${entry.date} ${entry.name} <${entry.email}>: ${entry.message.slice(0, 120)}`);
  res.json({ ok: true, message: 'Thanks! Your message was received.' });
});

// --- API: resume download (serves the .docx from the project root) ---
app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'Divij Jhunjhunwala.docx');
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ error: 'Resume file not found on server.' });
  }
  res.download(resumePath, 'Divij-Jhunjhunwala-Resume.docx');
});

// --- Serve React production build ---
const distPath = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback (Express 5: use regex, not '*')
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API route not found' });
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      ok: true,
      message: 'API running. Build the client with: npm run build',
      endpoints: ['GET /api/health', 'POST /api/contact', 'GET /api/resume'],
    });
  });
}

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
