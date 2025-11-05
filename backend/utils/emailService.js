import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
  }
});

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
export const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"New Rising Star Badminton Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - OTP Code',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5e6d3; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #c9a961; margin-bottom: 10px; }
          .subtitle { font-size: 14px; color: #8b7355; letter-spacing: 2px; }
          .otp-box { background: #f5e6d3; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #c9a961; letter-spacing: 8px; }
          .message { color: #5a4a3a; line-height: 1.6; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #8b7355; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">NEW RISING STAR</div>
            <div class="subtitle">BADMINTON ACADEMY</div>
          </div>
          
          <div class="message">
            <p>Hello ${name},</p>
            <p>Thank you for registering with New Rising Star Badminton Academy!</p>
            <p>Your verification code is:</p>
          </div>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="message">
            <p>This code will expire in <strong>10 minutes</strong>.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          
          <div class="footer">
            <p>© 2024 New Rising Star Badminton Academy. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};
