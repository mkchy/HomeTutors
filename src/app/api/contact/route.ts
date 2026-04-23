import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, phone, email, message } = body

    // ── Validation ─────────────────────────────────────────
    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // ── Transporter (Gmail example) ─────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,   // your Gmail address
        pass: process.env.SMTP_PASS,   // Gmail App Password (not your login password)
      },
    })

    // ── Email to ADMIN ──────────────────────────────────────
    await transporter.sendMail({
      from: `"Home Tutors Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Enquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#4F46E5,#7c3aed);padding:32px 40px;">
            <h1 style="color:white;margin:0;font-size:22px;font-weight:900;">New Enquiry Received</h1>
            <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:14px;">Home Tutors Platform</p>
          </div>
          <div style="padding:32px 40px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;width:130px;">Full Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:700;color:#111827;font-size:14px;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:700;color:#4F46E5;font-size:14px;"><a href="mailto:${email}" style="color:#4F46E5;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:700;color:#111827;font-size:14px;">${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;padding-top:14px;">Message</td><td style="padding:10px 0;color:#374151;font-size:14px;line-height:1.6;padding-top:14px;">${message}</td></tr>
            </table>
          </div>
          <div style="padding:20px 40px;background:#f9fafb;text-align:center;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        </div>
      `,
    })

    // ── Confirmation email to USER ──────────────────────────
    await transporter.sendMail({
      from: `"Home Tutors" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ We received your enquiry, ${firstName}!`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#4F46E5,#7c3aed);padding:32px 40px;text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">🎓</div>
            <h1 style="color:white;margin:0;font-size:22px;font-weight:900;">Thank you, ${firstName}!</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">We've received your enquiry</p>
          </div>
          <div style="padding:32px 40px;">
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;">Hi <strong>${firstName}</strong>, thank you for reaching out to <strong>Home Tutors</strong>. Our team will review your message and get back to you within <strong>24 hours</strong>.</p>
            <div style="background:#f5f3ff;border-radius:10px;padding:20px 24px;border-left:4px solid #4F46E5;margin-bottom:24px;">
              <p style="color:#6b7280;font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:.05em;font-weight:700;">Your Message</p>
              <p style="color:#374151;font-size:14px;margin:0;line-height:1.6;">${message}</p>
            </div>
            <p style="color:#6b7280;font-size:13px;margin:0;">If you have urgent queries, contact us directly at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color:#4F46E5;font-weight:600;">${process.env.ADMIN_EMAIL}</a></p>
          </div>
          <div style="padding:20px 40px;background:#f9fafb;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Home Tutors. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
