const express = require('express');
const app = express();
app.use(express.json());

// 1. Verification Handshake (Meta calls this when you click "Verify and save")
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "test";
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge); // Sends back the challenge to prove ownership
  } else {
    res.sendStatus(403);
  }
});

// 2. Incoming Messages (Meta pushes DMs here automatically)
app.post('/webhook', (req, res) => {
  console.log("Received webhook:", JSON.stringify(req.body, null, 2));
  
  // Extract message text and sender ID here to check against your database codes!
  
  res.status(200).send('EVENT_RECEIVED');
});

// test 
app.get('/', (req, res)=>{
  res.send('running')
})

app.listen(3000, () => console.log('Webhook server running on port 3000'));