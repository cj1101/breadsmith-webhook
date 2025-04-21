const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// The verify token should match what you configure in Meta
const VERIFY_TOKEN = "breadsmith_fixed_token_123";

// Parse JSON body
app.use(express.json());

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  console.log(`Received verification request - Mode: ${mode}, Token: ${token}`);
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    console.log('Webhook verification failed');
    res.sendStatus(403);
  }
});

// Webhook event handling
app.post('/webhook', (req, res) => {
  console.log('Received webhook event:', JSON.stringify(req.body));
  
  // Simply acknowledge receipt of the event
  res.status(200).send('EVENT_RECEIVED');
});

// Health check route
app.get('/', (req, res) => {
  res.send('Breadsmith Webhook Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
