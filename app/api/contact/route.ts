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
      html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body{margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;}
  .wrapper{padding:40px 16px;}
  .card{max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;}
  .header{padding:32px;}
  .title{margin:0;font-size:24px;font-weight:700;color:#111827;}
  .date{margin-top:10px;font-size:14px;color:#6b7280;}
  .divider{height:1px;background:#e5e7eb;}
  .content{padding:32px;}
  .row{display:flex;align-items:flex-start;padding:14px 0;border-bottom:1px solid #f3f4f6;}
  .row:last-child{border-bottom:none;}
  .label{width:90px;font-weight:600;color:#111827;font-size:15px;flex-shrink:0;}
  .value{color:#374151;font-size:15px;word-break:break-word;}
  .email{color:#2563eb;text-decoration:none;}
  .message-wrapper{margin-top:28px;}
  .message-label{font-size:12px;font-weight:700;letter-spacing:0.08em;color:#6b7280;margin-bottom:12px;text-transform:uppercase;}
  .message-box{border:1px solid #d1d5db;border-radius:8px;padding:22px;background:#fafafa;color:#374151;line-height:1.8;font-size:15px;}
  .button-wrap{margin-top:30px;}
  .button{display:inline-block;background:#0f172a;color:#ffffff !important;text-decoration:none;padding:13px 26px;border-radius:6px;font-size:14px;font-weight:600;}
  .footer{border-top:1px solid #e5e7eb;padding:24px;text-align:center;font-size:13px;color:#6b7280;line-height:1.8;}
  @media(max-width:600px){
    .header{padding:24px;}
    .content{padding:24px;}
    .row{flex-direction:column;gap:6px;}
    .label{width:100%;}
    .button{width:100%;text-align:center;box-sizing:border-box;}
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <h1 class="title">New Contact Message</h1>
      <div class="date">Received on ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
    </div>
    <div class="divider"></div>
    <div class="content">
      <div class="row">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="row">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}" class="email">${email}</a></div>
      </div>
      <div class="row">
        <div class="label">Subject:</div>
        <div class="value">${emailSubject}</div>
      </div>
      <div class="message-wrapper">
        <div class="message-label">Message Body</div>
        <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
      </div>
      <div class="button-wrap">
        <a href="mailto:${email}" class="button">Reply to ${name}</a>
      </div>
    </div>
    <div class="footer">
      Automated message from your portfolio<br/>
      &copy; ${new Date().getFullYear()} bimlesharma
    </div>
  </div>
</div>
</body>
</html>`,
    });

    // 2. Send confirmation to sender (COMMENTED OUT TEMPORARILY — domain expired)
    /*
    const toSender = await resend.emails.send({
      from: 'no-reply@mail.bimlesh.xyz',
      to: email,
      subject: `Thanks for contacting me, ${name}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; padding: 40px 20px; color: #111827;">
          <table width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden; border: 1px solid #e5e7eb;">
            <tr>
              <td style="padding: 32px; border-bottom: 1px solid #f3f4f6;">
                <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827;">Message Received</h2>
                <p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; font-size: 16px; color: #374151; line-height: 1.6;">
                <p style="margin: 0 0 16px;">Hi <strong>${name}</strong>,</p>
                <p style="margin: 0 0 24px;">Thank you for reaching out. I have received your message and will review it shortly. I typically respond within 24-48 hours.</p>
                <div style="background: #f9fafb; padding: 24px; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                  <strong style="display: block; margin-bottom: 12px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Your Message</strong>
                  <div style="color: #4b5563; font-style: italic;">${message.replace(/\n/g, '<br/>')}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 32px;">
                <a href="https://github.com/bimlesharma" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">Visit My GitHub</a>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
                <div style="margin-bottom: 4px;">This is an automated confirmation — please do not reply to this email.</div>
                <div>&copy; ${new Date().getFullYear()} bimlesharma</div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
    */

    // if (toYou.data?.id && toSender.data?.id) {
    //   return new Response(
    //     JSON.stringify({ success: true, ids: [toYou.data.id, toSender.data.id] }),
    //     { status: 200, headers: { 'Content-Type': 'application/json' } }
    //   );
    // }

    // Temporary success logic while toSender is commented out:
    if (toYou.data?.id) {
      return new Response(
        JSON.stringify({ success: true, id: toYou.data.id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const errorMsg = toYou.error?.message || 'Unknown error'; // || toSender.error?.message
    console.error('RESEND API ERROR:', errorMsg);
    return new Response(JSON.stringify({ error: errorMsg }), { status: 500 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
