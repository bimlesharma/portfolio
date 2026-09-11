import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Prefer a verified Resend domain sender via RESEND_FROM_EMAIL (e.g. hello@bimlesh.dev).
// Falls back to Resend's onboarding address so local/prod keep working until a domain is verified.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

type RateEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateEntry>();

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    let body: ContactRequestBody;
    try {
      body = (await req.json()) as ContactRequestBody;
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: name, email, message',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (
      name.length > MAX_NAME ||
      subject.length > MAX_SUBJECT ||
      message.length > MAX_MESSAGE
    ) {
      return new Response(JSON.stringify({ error: 'Field too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Count only well-formed submissions toward the send quota so malformed
    // JSON / validation failures cannot exhaust the limit.
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'Email service is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(
      subject || `New message from ${name}`,
    );
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
    const emailSubject = subject || `New message from ${name}`;

    const toYou = await resend.emails.send({
      from: FROM_EMAIL,
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
        <div class="value">${safeName}</div>
      </div>
      <div class="row">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${safeEmail}" class="email">${safeEmail}</a></div>
      </div>
      <div class="row">
        <div class="label">Subject:</div>
        <div class="value">${safeSubject}</div>
      </div>
      <div class="message-wrapper">
        <div class="message-label">Message Body</div>
        <div class="message-box">${safeMessage}</div>
      </div>
      <div class="button-wrap">
        <a href="mailto:${safeEmail}" class="button">Reply to ${safeName}</a>
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

    if (toYou.data?.id) {
      return new Response(
        JSON.stringify({ success: true, id: toYou.data.id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const errorMsg = toYou.error?.message || 'Unknown error';
    console.error('RESEND API ERROR:', errorMsg);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
