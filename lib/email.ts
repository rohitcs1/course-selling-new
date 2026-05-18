import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // false for TLS, true for SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendCourseLink(
  email: string,
  courseLink: string,
  studentName?: string
) {
  try {
    const name = studentName || email.split('@')[0]

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Elneb EdTech!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for purchasing our video editing course. We're excited to have you on this learning journey!</p>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Your Course Access Link:</strong></p>
          <p><a href="${courseLink}" style="color: #0066cc; font-size: 16px; word-break: break-all;">${courseLink}</a></p>
        </div>

        <p>You can access your course materials using the link above. The course includes:</p>
        <ul>
          <li>Complete video editing tutorials</li>
          <li>Professional editing techniques</li>
          <li>Industry tools and shortcuts</li>
          <li>Real-world projects</li>
        </ul>

        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Happy learning!</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Best regards,<br/>
          Elneb EdTech Team
        </p>
      </div>
    `

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Your Elneb EdTech Course Access Link',
      html: htmlContent,
      text: `Welcome to Elneb EdTech!\n\nThank you for purchasing our course.\n\nYour course link: ${courseLink}\n\nHappy learning!`,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('[v0] Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('[v0] Email sending failed:', error)
    return { success: false, error: String(error) }
  }
}

export async function verifyTransporter() {
  try {
    await transporter.verify()
    console.log('[v0] SMTP connection verified')
    return true
  } catch (error) {
    console.error('[v0] SMTP verification failed:', error)
    return false
  }
}
