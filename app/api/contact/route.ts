import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = (await req.json()) as ContactRequestBody;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message' }),
        { status: 400 }
      );
    }

    const emailSubject = subject?.trim() || `New message from ${name}`;

    // 1. Send to you
    const toYou = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'bimlesh.mdb@gmail.com',
      subject: emailSubject,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background-color: #0a0a0a; padding: 0px; color: #f9f9f9;">
  <table width="100%" style="max-width: 600px; margin: 0 auto; background: #111111; border-radius: 12px; box-shadow: 0 0 24px rgba(255, 69, 0, 0.25); overflow: hidden;">

    <!-- Header -->
    <tr>
      <td style="padding: 32px; background-color: #000000;">
        <table width="100%">
          <tr>
            <td align="center" style="text-align: center;">
              <img src="https://bimlesh.xyz/_next/image?url=%2Fimages%2Fme2.png&w=640&q=75" width="60" style="border-radius: 30%; display: block; margin: 0 auto 16px;" alt="Profile">
              <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">New Contact Form Submission</h2>
              <p style="margin: 8px 0 0; font-size: 14px; color: #9ca3af;">${new Date().toDateString()}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Details -->
    <tr>
      <td style="padding: 28px 32px;">
        <!--<p style="margin: 0 0 20px; font-size: 15px; color: #e5e5e5;">📨 You’ve received a message via your website:</p>-->
        <table width="100%" style="font-size: 15px;">
          <tr><td style="padding: 6px 0;"><strong style="color: #FF4500;">Name:</strong> ${name}</td></tr>
          <tr><td style="padding: 6px 0;"><strong style="color: #FF4500;">Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td></tr>
          <tr><td style="padding: 6px 0;"><strong style="color: #FF4500;">Purpose:</strong> ${emailSubject}</td></tr>
        </table>

        <!-- Message -->
        <div style="margin-top: 24px; background-color: #1a1a1a; padding: 20px; border-left: 4px solid #FF4500; border-radius: 8px; line-height: 1.6; color: #d1d5db;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </td>
    </tr>

    <!-- CTA Buttons -->
    <tr>
      <td style="padding: 0 32px 32px; text-align: center;">
        <a href="mailto:${email}" style="background-color: #FF4500; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-right: 10px;">Reply Now</a>
        <!--<a href="https://yourdashboard.com/messages" style="border: 1px solid #FF4500; color: #FF4500; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">🔍 View in Dashboard</a>-->
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #0d0d0d; color: #6b7280; font-size: 12px; text-align: center; padding: 20px;">
        This is an automated message sent from your portfolio site.<br>
        &copy; ${new Date().getFullYear()} <strong style="color: #FF4500;">bimlesh.xyz</strong>
      </td>
    </tr>

  </table>
</div>

      `,
    });

    // 2. Send confirmation to sender
    const toSender = await resend.emails.send({
      from: 'no-reply@mail.bimlesh.xyz',
      to: email,
      subject: `Thanks for contacting me, ${name}!`,
      html: `
        <!-- =========================
     “Thank You” Response Email – No Reply Version
     Theme: Dark + Orange Accent
========================= -->
<div style="font-family: 'Segoe UI', sans-serif; background:#0a0a0a; padding:0px; color:#f9f9f9;">
  <table width="100%" style="max-width:600px; margin:0 auto; background:#111; border-radius:12px; box-shadow:0 0 24px rgba(255,69,0,.25); overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="padding:32px; background:#000; text-align:center;">
        <img src="https://bimlesh.xyz/_next/image?url=%2Fimages%2Fme2.png&w=640&q=75"
             width="60"
             alt="Profile"
             style="border-radius:30%; display:block; margin:0 auto 16px;">
        <h1 style="margin:0; font-size:24px; font-weight:700; color:#fff;">Thanks for Your Message!</h1>
        <p style="margin:8px 0 0; font-size:14px; color:#9ca3af;">Received on ${new Date().toDateString()}</p>
      </td>
    </tr>

    <!-- Greeting -->
    <tr>
      <td style="padding:28px 32px; font-size:15px; color:#e5e5e5;">
        Hi <strong style="color:#FF4500;">${name}</strong>,
        <br><br>
        I truly appreciate your interest. Your message has been received and is being reviewed.
      </td>
    </tr>

    <!-- Message Echo (optional) -->
    <tr>
      <td style="padding:0 32px 24px;">
        <div style="background:#1a1a1a; padding:20px; border-left:4px solid #FF4500; border-radius:8px; line-height:1.6; color:#d1d5db;">
          <em>Your message:</em><br>
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </td>
    </tr>

    <!-- Info -->
    <tr>
      <td style="padding:0 32px 32px; font-size:15px; color:#e5e5e5; line-height:1.6;">
        I usually respond within <strong>24–48 hours</strong>. In the meantime, feel free to check out my portfolio or reach out directly by phone for urgent inquiries.
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding:0 32px 40px; text-align:center;">
        <a href="https://bimlesh.xyz/"
           style="background:#FF4500; color:#fff; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:600;">
          🔗 Visit My Portfolio
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#0d0d0d; color:#6b7280; font-size:12px; text-align:center; padding:20px;">
        This is an automated message — replies to this email will not be monitored.<br>
        📞 Contact: <strong style="color:#FF4500;">+91-7070519696</strong><br>
        &copy; ${new Date().getFullYear()} <strong style="color:#FF4500;">bimlesh.xyz</strong>
      </td>
    </tr>

  </table>
</div>

      `,
    });

    if (toYou.data?.id && toSender.data?.id) {
      return new Response(
        JSON.stringify({ success: true, ids: [toYou.data.id, toSender.data.id] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const errorMsg = toYou.error?.message || toSender.error?.message || 'Unknown error';
    return new Response(JSON.stringify({ error: errorMsg }), { status: 500 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
