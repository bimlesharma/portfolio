import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; padding: 40px 20px; color: #f1f5f9;">
  <table width="100%" style="max-width: 600px; margin: 0 auto; background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; box-shadow: 0 20px 60px rgba(6, 182, 212, 0.15); overflow: hidden; border: 1px solid #334155;">

    <!-- Header with Gradient -->
    <tr>
      <td style="padding: 40px 32px; background: linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #10b981 100%); text-align: center;">
        <h2 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">New Contact Message</h2>
        <p style="margin: 12px 0 0; font-size: 14px; color: #e0f2fe; opacity: 0.9;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </td>
    </tr>

    <!-- Details Section -->
    <tr>
      <td style="padding: 32px;">
        <div style="background: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
          <table width="100%" style="font-size: 15px; color: #cbd5e1;">
            <tr>
              <td style="padding: 10px 0;">
                <span style="color: #06b6d4; font-weight: 600;">Name:</span>
                <span style="color: #f1f5f9; margin-left: 8px;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <span style="color: #06b6d4; font-weight: 600;">Email:</span>
                <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; margin-left: 8px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <span style="color: #06b6d4; font-weight: 600;">Subject:</span>
                <span style="color: #f1f5f9; margin-left: 8px;">${emailSubject}</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Message Box -->
        <div style="margin-top: 24px; background: #1e293b; padding: 24px; border-left: 4px solid #06b6d4; border-radius: 12px; line-height: 1.7; color: #cbd5e1;">
          <div style="color: #06b6d4; font-weight: 600; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</div>
          <div style="color: #e2e8f0;">${message.replace(/\n/g, '<br/>')}</div>
        </div>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding: 0 32px 40px; text-align: center;">
        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #a78bfa); color: #fff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">Reply Now</a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #0f172a; color: #64748b; font-size: 13px; text-align: center; padding: 24px; border-top: 1px solid #334155;">
        <div style="margin-bottom: 8px;">This is an automated message from your portfolio contact form</div>
        <div style="color: #06b6d4; font-weight: 600;">&copy; ${new Date().getFullYear()} bimlesh.xyz</div>
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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; padding: 40px 20px; color: #f1f5f9;">
  <table width="100%" style="max-width: 600px; margin: 0 auto; background: linear-gradient(to bottom, #1e293b, #0f172a); border-radius: 16px; box-shadow: 0 20px 60px rgba(6, 182, 212, 0.15); overflow: hidden; border: 1px solid #334155;">

    <!-- Header with Gradient -->
    <tr>
      <td style="padding: 40px 32px; background: linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #10b981 100%); text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">✨</div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Message Received!</h1>
        <p style="margin: 12px 0 0; font-size: 14px; color: #e0f2fe; opacity: 0.9;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </td>
    </tr>

    <!-- Greeting -->
    <tr>
      <td style="padding: 32px; font-size: 16px; color: #cbd5e1; line-height: 1.6;">
        <div style="margin-bottom: 20px;">
          Hi <strong style="color: #06b6d4;">${name}</strong>,
        </div>
        <div>
          Thank you for reaching out! I've received your message and truly appreciate your interest. I'll review it carefully and get back to you soon.
        </div>
      </td>
    </tr>

    <!-- Message Echo -->
    <tr>
      <td style="padding: 0 32px 24px;">
        <div style="background: #1e293b; padding: 24px; border-left: 4px solid #a78bfa; border-radius: 12px; line-height: 1.7;">
          <div style="color: #a78bfa; font-weight: 600; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message:</div>
          <div style="color: #cbd5e1; font-style: italic;">${message.replace(/\n/g, '<br/>')}</div>
        </div>
      </td>
    </tr>

    <!-- Response Time Info -->
    <tr>
      <td style="padding: 0 32px 32px;">
        <div style="background: linear-gradient(135deg, #06b6d420, #a78bfa20); border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center;">
          <div style="font-size: 32px; margin-bottom: 12px;">⚡</div>
          <div style="color: #f1f5f9; font-weight: 600; margin-bottom: 8px;">Quick Response Guaranteed</div>
          <div style="color: #94a3b8; font-size: 14px;">I typically respond within <strong style="color: #06b6d4;">24-48 hours</strong></div>
        </div>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding: 0 32px 40px; text-align: center;">
        <a href="https://bimlesh.xyz/" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #a78bfa); color: #fff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">Visit My Portfolio</a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #0f172a; color: #64748b; font-size: 13px; text-align: center; padding: 24px; border-top: 1px solid #334155;">
        <div style="margin-bottom: 8px;">This is an automated confirmation — please do not reply to this email</div>
        <div style="margin-bottom: 8px;">For urgent matters: <strong style="color: #06b6d4;">+91-7070519696</strong></div>
        <div style="color: #06b6d4; font-weight: 600;">&copy; ${new Date().getFullYear()} bimlesh.xyz</div>
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
