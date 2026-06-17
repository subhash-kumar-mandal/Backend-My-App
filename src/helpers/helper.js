function getOtpEmailHtml(otp) {
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #f0f2f5; font-family: 'DM Sans', sans-serif; }
    .wrapper { max-width: 600px; margin: 48px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 36px 48px; display: flex; align-items: center; gap: 12px; }
    .logo-mark { width: 40px; height: 40px; background: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .company-name { font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px; }
    .body { padding: 48px 48px 40px; }
    .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #3b82f6; margin-bottom: 12px; }
    .heading { font-size: 26px; font-weight: 600; color: #0f172a; line-height: 1.3; margin-bottom: 16px; }
    .intro { font-size: 15px; color: #64748b; line-height: 1.7; margin-bottom: 36px; }
    .otp-box { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 28px 32px; margin-bottom: 32px; text-align: center; }
    .otp-label { font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #94a3b8; margin-bottom: 14px; }
    .otp-code { font-family: 'DM Mono', monospace; font-size: 42px; font-weight: 500; color: #0f172a; letter-spacing: 10px; display: inline-block; padding-left: 10px; margin-bottom: 20px; }
    .expiry-pill { display: inline-flex; align-items: center; gap: 6px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 100px; padding: 6px 14px; font-size: 13px; font-weight: 500; color: #92400e; }
    .notice { background: #eff6ff; border-left: 3px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-bottom: 36px; font-size: 13.5px; color: #1e40af; line-height: 1.6; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin-bottom: 28px; }
    .help { font-size: 13.5px; color: #94a3b8; line-height: 1.7; }
    .help a { color: #3b82f6; text-decoration: none; font-weight: 500; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 48px; }
    .footer-links { display: flex; gap: 20px; margin-bottom: 12px; }
    .footer-links a { font-size: 12px; color: #94a3b8; text-decoration: none; font-weight: 500; }
    .footer-copy { font-size: 12px; color: #cbd5e1; }
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="logo-mark">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L19.5 7V15L11 20L2.5 15V7L11 2Z" fill="white" fill-opacity="0.9"/>
        <path d="M11 6L15.5 8.75V14.25L11 17L6.5 14.25V8.75L11 6Z" fill="#3b82f6"/>
      </svg>
    </div>
    <span class="company-name">Acme Corp</span>
  </div>

  <div class="body">
    <p class="eyebrow">Security Verification</p>
    <h1 class="heading">Your One-Time Password</h1>
    <p class="intro">We received a request to verify your identity. Use the code below to complete your action. This code is single-use and time-sensitive.</p>

    <div class="otp-box">
      <p class="otp-label">Verification Code</p>
      <div class="otp-code">${otp}</div>
      <span class="expiry-pill">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#92400e" stroke-width="1.3"/>
          <path d="M7 4V7.5L9 9" stroke="#92400e" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Expires in 5 minutes
      </span>
    </div>

    <div class="notice">
      <strong>Security notice:</strong> Acme Corp will never ask for this code over phone or email.
      If you did not request this, please <a href="mailto:security@acmecorp.com" style="color:#1e40af;font-weight:600;">contact our security team</a> immediately.
    </div>

    <hr class="divider"/>
    <p class="help">Need help? Email us at <a href="mailto:support@acmecorp.com">support@acmecorp.com</a>. We're available 24/7.</p>
  </div>

  <div class="footer">
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>
    <p class="footer-copy">© 2026 Acme Corp, Inc. · 123 Business Ave, San Francisco, CA 94105</p>
  </div>
</div>
</body>
</html>`

return `
<html>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:32px 48px;">
              <span style="font-size:22px;font-weight:700;color:#ffffff;">⬡ Acme Corp</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <p style="font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#3b82f6;margin:0 0 10px 0;">Security Verification</p>
              <h1 style="font-size:26px;font-weight:700;color:#0f172a;margin:0 0 16px 0;">Your One-Time Password</h1>
              <p style="font-size:15px;color:#64748b;line-height:1.7;margin:0 0 32px 0;">
                We received a request to verify your identity. Use the code below to complete your action. This code is single-use and time-sensitive.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td align="center" style="padding:32px;">
                    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#94a3b8;margin:0 0 14px 0;">Verification Code</p>
                    <p style="font-family:Courier New,monospace;font-size:48px;font-weight:700;color:#0f172a;letter-spacing:12px;margin:0 0 20px 0;">${otp}</p>
                    <span style="display:inline-block;background:#fef3c7;border:1px solid #fde68a;border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#92400e;">
                      ⏱ Expires in 5 minutes
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="font-size:13px;color:#1e40af;line-height:1.6;margin:0;">
                      <strong>Security notice:</strong> Acme Corp will never ask for this code via phone or email. If you did not request this, please 
                      <a href="mailto:security@acmecorp.com" style="color:#1e40af;font-weight:700;">contact our security team</a> immediately.
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:28px;"/>
              <p style="font-size:13px;color:#94a3b8;line-height:1.7;margin:0;">
                Need help? Email us at <a href="mailto:support@acmecorp.com" style="color:#3b82f6;font-weight:600;">support@acmecorp.com</a>. We're available 24/7.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;">
              <p style="font-size:12px;color:#94a3b8;margin:0 0 8px 0;">
                <a href="#" style="color:#94a3b8;text-decoration:none;margin-right:16px;">Privacy Policy</a>
                <a href="#" style="color:#94a3b8;text-decoration:none;">Terms of Service</a>
              </p>
              <p style="font-size:12px;color:#cbd5e1;margin:0;">© 2026 Acme Corp, Inc. · 123 Business Ave, San Francisco, CA 94105</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}


module.exports = {getOtpEmailHtml}