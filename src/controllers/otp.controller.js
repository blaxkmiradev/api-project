// In-memory store for OTPs (Use a DB like Redis or MongoDB in production)
const otpStore = {}; 

const generateOtp = (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with a 5-minute expiration timestamp
    otpStore[email] = {
        code: otp,
        expiresAt: Date.now() + 5 * 60 * 1000 
    };

    console.log(`[SIMULATED EMAIL] Sent OTP ${otp} to ${email}`);

    res.status(200).json({ message: 'OTP generated and sent successfully' });
};

const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({ error: 'No OTP requested for this email' });
    }

    if (Date.now() > record.expiresAt) {
        delete otpStore[email]; // Clean up expired OTP
        return res.status(400).json({ error: 'OTP has expired' });
    }

    if (record.code === otp) {
        delete otpStore[email]; // Clean up used OTP
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
};

module.exports = { generateOtp, verifyOtp };
