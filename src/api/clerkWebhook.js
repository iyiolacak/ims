export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle the webhook data
      console.log('Received webhook:', req.body);
      // Process the webhook data
      res.status(200).json({ message: 'Webhook received successfully' });
    } else {
      // Not a POST request, so we don't handle it
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  