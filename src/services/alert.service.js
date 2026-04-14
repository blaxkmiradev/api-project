const sendAlert = (message) => {
    // In a real application, you would make an HTTP request to Slack/Discord here
    // Example: axios.post('SLACK_WEBHOOK_URL', { text: message });
    
    console.log('\n====================================');
    console.log('🔔 ALERT TRIGGERED');
    console.log(`Message: ${message}`);
    console.log('====================================\n');
};

module.exports = { sendAlert };
