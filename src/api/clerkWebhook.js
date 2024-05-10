export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log("Received webhook:", req.body)
        req.status(200).json({ message: 'Webhook received successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}