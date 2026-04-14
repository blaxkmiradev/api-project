const alertService = require('../services/alert.service');

const handleWebhook = (req, res) => {
    const payload = req.body;

    // Basic validation to ensure we received data
    if (!payload || Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'Empty webhook payload' });
    }

    console.log('📥 Webhook received:', payload);

    // Trigger an alert based on the webhook data
    alertService.sendAlert(`New Webhook Event: ${JSON.stringify(payload.event || 'Unknown Event')}`);

    // Always respond quickly to webhooks with a 200 OK
    res.status(200).json({ message: 'Webhook processed successfully' });
};

module.exports = { handleWebhook };
