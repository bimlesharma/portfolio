# Portfolio manual + automated test cases (areas 1–7)

Run automated checks:

```bash
chmod +x scripts/e2e-checklist.sh
./scripts/e2e-checklist.sh http://localhost:3000
```

Optional production:

```bash
./scripts/e2e-checklist.sh https://bimlesh.dev
```

---

## TC-1 — Contact / Resend email

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-1.1 | Auto | `POST /api/contact` with `{}` | `400` missing fields |
| TC-1.2 | Auto | Invalid email | `400` |
| TC-1.3 | Auto | Payload with `<script>` in name/message | `200` success (HTML escaped in email body) |
| TC-1.4 | Auto | 6 requests from same IP within window | 6th → `429` |
| TC-1.5 | **Manual** | Submit contact form on site with your real email | Email arrives at inbox; name/message escaped; Reply-To = sender |

Env: `RESEND_API_KEY` required. `RESEND_FROM_EMAIL` optional (defaults to `onboarding@resend.dev`; set a verified domain for production).

---

## TC-2 — Sanity revalidate webhook

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-2.1 | Auto | `POST /api/revalidate` without valid signature | `401` |
| TC-2.2 | **Manual** | Sanity webhook URL=`https://…/api/revalidate`, secret=`SANITY_REVALIDATE_SECRET`, publish/update a `post` | Webhook 200; `/blog` shows update without redeploy |

---

## TC-3 — UI / UX

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-3.1 | Auto | `GET /` | 200; contains My Work, CleanPulse, `id="work"` |
| TC-3.2 | Auto | `GET /products/cleanpulse` | 200; “Visit site” |
| TC-3.3 | Auto | `GET /blog` | Explore + Work links present |
| TC-3.4 | **Manual** | Desktop home | CleanPulse ~2-col; minimal tiles; **one** floating dock |

---

## TC-4 — CursorEffect

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-4.1 | **Manual** | Desktop + mouse on `/` | Particle canvas follows cursor |
| TC-4.2 | **Manual** | Enable OS “Reduce motion” | No canvas; hero title static |
| TC-4.3 | **Manual** | Phone or DevTools mobile | No CursorEffect |

---

## TC-5 — RSS author

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-5.1 | Auto | `GET /blog/feed.xml` | 200; `<rss>` + `<item>` (Sanity reachable) |
| TC-5.2 | Auto/Manual | Feed contains `<author>` if posts have authors | Present after Studio author + revalidate |

---

## TC-6 — Open Graph / share preview

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-6.1 | Auto | `GET /opengraph-image` | 200; `Content-Type: image/*` |
| TC-6.2 | **Manual** | After deploy, paste site URL into Slack / [Twitter Card Validator](https://cards-dev.twitter.com/validator) / LinkedIn Post Inspector | Brand OG image shows |

---

## TC-7 — Studio + admin

| ID | Type | Steps | Expected |
|----|------|-------|----------|
| TC-7.1 | Auto | `GET /admin` | Redirect to `/studio` |
| TC-7.2 | Auto | `GET /studio` | 200 (or redirect into studio) |
| TC-7.3 | Auto | `GET /robots.txt` | Disallows `/studio/` and `/admin/` |
| TC-7.4 | **Manual** | Open `/studio`, edit & publish a post | Saves; preview/site updates (with webhook) |
