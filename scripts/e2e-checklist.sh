#!/usr/bin/env bash
# Portfolio e2e smoke + checklist for areas 1–7.
# Usage: ./scripts/e2e-checklist.sh [BASE_URL]
# Default BASE_URL=http://localhost:3000

set -u
BASE="${1:-http://localhost:3000}"
pass=0
fail=0
skip=0

green() { printf '\033[32m%s\033[0m\n' "$*"; }
red() { printf '\033[31m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }

pass_case() { green "PASS  $1"; pass=$((pass + 1)); }
fail_case() { red "FAIL  $1 — $2"; fail=$((fail + 1)); }
skip_case() { yellow "SKIP  $1 — $2"; skip=$((skip + 1)); }

http_code() {
  curl -s -o "$2" -w '%{http_code}' "${@:3}" "$1"
}

echo "=== Portfolio e2e checklist against $BASE ==="
echo ""

# ---------------------------------------------------------------------------
# TC-1 RESEND / contact delivery
# ---------------------------------------------------------------------------
echo "## TC-1 Contact email delivery"

code=$(http_code "$BASE/api/contact" /tmp/tc1-missing.json -X POST \
  -H 'Content-Type: application/json' -H 'x-forwarded-for: 203.0.113.10' \
  -d '{}')
if [[ "$code" == "400" ]]; then pass_case "TC-1.1 missing fields → 400"; else fail_case "TC-1.1 missing fields → 400" "got $code"; fi

code=$(http_code "$BASE/api/contact" /tmp/tc1-bad.json -X POST \
  -H 'Content-Type: application/json' -H 'x-forwarded-for: 203.0.113.11' \
  -d '{"name":"A","email":"not-an-email","message":"hi"}')
if [[ "$code" == "400" ]]; then pass_case "TC-1.2 invalid email → 400"; else fail_case "TC-1.2 invalid email → 400" "got $code"; fi

code=$(http_code "$BASE/api/contact" /tmp/tc1-xss.json -X POST \
  -H 'Content-Type: application/json' -H 'x-forwarded-for: 203.0.113.12' \
  -d '{"name":"<script>alert(1)</script>","email":"xss@example.com","subject":"<b>x</b>","message":"line1\n<script>x</script>"}')
# May be 200 (sent) or 429 if rate-limited; body must not echo raw <script> unescaped on error paths.
if [[ "$code" == "200" ]]; then
  if grep -q '"success":true' /tmp/tc1-xss.json; then
    pass_case "TC-1.3 XSS payload accepted (escaped server-side) → 200"
  else
    fail_case "TC-1.3 XSS payload → 200" "unexpected body $(cat /tmp/tc1-xss.json)"
  fi
elif [[ "$code" == "429" ]]; then
  skip_case "TC-1.3 XSS send" "rate limited; re-run later"
elif [[ "$code" == "500" ]]; then
  fail_case "TC-1.3 contact send" "500 $(cat /tmp/tc1-xss.json) — check RESEND_API_KEY"
else
  fail_case "TC-1.3 contact send" "got $code $(cat /tmp/tc1-xss.json)"
fi

# Rate limit with dedicated IP
rl_ip="203.0.113.77"
for i in 1 2 3 4 5; do
  curl -s -o /dev/null -X POST "$BASE/api/contact" \
    -H 'Content-Type: application/json' -H "x-forwarded-for: $rl_ip" \
    -d '{"name":"RL","email":"rl@example.com","message":"m"}' >/dev/null
done
code=$(http_code "$BASE/api/contact" /tmp/tc1-rl.json -X POST \
  -H 'Content-Type: application/json' -H "x-forwarded-for: $rl_ip" \
  -d '{"name":"RL","email":"rl@example.com","message":"m"}')
if [[ "$code" == "429" ]]; then pass_case "TC-1.4 rate limit → 429"; else fail_case "TC-1.4 rate limit → 429" "got $code"; fi

skip_case "TC-1.5 inbox delivery" "MANUAL: open Gmail, confirm email arrived, HTML shows escaped tags, Reply-To is sender"

echo ""

# ---------------------------------------------------------------------------
# TC-2 Sanity webhook revalidation
# ---------------------------------------------------------------------------
echo "## TC-2 Sanity revalidate webhook"

code=$(http_code "$BASE/api/revalidate" /tmp/tc2-unauth.json -X POST \
  -H 'Content-Type: application/json' \
  -d '{"_type":"post","slug":{"current":"test"}}')
if [[ "$code" == "401" ]]; then pass_case "TC-2.1 unsigned webhook → 401"; else fail_case "TC-2.1 unsigned webhook → 401" "got $code"; fi

skip_case "TC-2.2 signed webhook" "MANUAL: Sanity Manage → Webhooks → secret = SANITY_REVALIDATE_SECRET, URL=/api/revalidate, publish a post, confirm blog updates"

echo ""

# ---------------------------------------------------------------------------
# TC-3 UI / UX mosaic + nav
# ---------------------------------------------------------------------------
echo "## TC-3 UI / UX (partially automated)"

code=$(http_code "$BASE/" /tmp/tc3-home.html)
if [[ "$code" == "200" ]] && grep -q 'My Work' /tmp/tc3-home.html && grep -q 'CleanPulse' /tmp/tc3-home.html && grep -q 'id="work"' /tmp/tc3-home.html; then
  pass_case "TC-3.1 home My Work mosaic markers"
else
  fail_case "TC-3.1 home My Work mosaic markers" "code=$code"
fi

code=$(http_code "$BASE/products/cleanpulse" /tmp/tc3-cp.html)
if [[ "$code" == "200" ]] && grep -q 'Visit site' /tmp/tc3-cp.html; then
  pass_case "TC-3.2 CleanPulse detail Visit site"
else
  fail_case "TC-3.2 CleanPulse detail Visit site" "code=$code"
fi

code=$(http_code "$BASE/blog" /tmp/tc3-blog.html)
if [[ "$code" == "200" ]] && grep -q '/blog/explore' /tmp/tc3-blog.html && grep -q '/#work' /tmp/tc3-blog.html; then
  pass_case "TC-3.3 blog has Explore + Work links"
else
  fail_case "TC-3.3 blog has Explore + Work links" "code=$code"
fi

skip_case "TC-3.4 visual mosaic / hover / single dock" "MANUAL: desktop browser — CleanPulse spans 2 cols, tiles minimal, one floating dock only"

echo ""

# ---------------------------------------------------------------------------
# TC-4 CursorEffect motion / touch
# ---------------------------------------------------------------------------
echo "## TC-4 CursorEffect"

skip_case "TC-4.1 desktop mouse" "MANUAL: desktop — particles follow cursor on home"
skip_case "TC-4.2 reduce motion" "MANUAL: OS reduce-motion ON — no cursor canvas / static hero title"
skip_case "TC-4.3 touch / coarse pointer" "MANUAL: phone or DevTools mobile — no CursorEffect canvas"

echo ""

# ---------------------------------------------------------------------------
# TC-5 RSS author
# ---------------------------------------------------------------------------
echo "## TC-5 RSS feed"

code=$(http_code "$BASE/blog/feed.xml" /tmp/tc5-feed.xml)
if [[ "$code" == "200" ]] && grep -q '<rss' /tmp/tc5-feed.xml && grep -q '<item>' /tmp/tc5-feed.xml; then
  pass_case "TC-5.1 feed.xml returns items"
else
  fail_case "TC-5.1 feed.xml returns items" "code=$code (Sanity must be reachable)"
fi

if grep -q '<author>' /tmp/tc5-feed.xml 2>/dev/null; then
  pass_case "TC-5.2 feed includes <author> when Sanity returns authorName"
else
  skip_case "TC-5.2 feed <author>" "MANUAL/optional: set author on a post in Studio, revalidate, confirm <author> in feed"
fi

echo ""

# ---------------------------------------------------------------------------
# TC-6 Share / OG preview
# ---------------------------------------------------------------------------
echo "## TC-6 Open Graph"

code=$(http_code "$BASE/opengraph-image" /tmp/tc6-og.bin)
ctype=$(curl -s -o /dev/null -w '%{content_type}' "$BASE/opengraph-image")
if [[ "$code" == "200" ]] && [[ "$ctype" == image/* ]]; then
  pass_case "TC-6.1 /opengraph-image returns image ($ctype)"
else
  fail_case "TC-6.1 /opengraph-image" "code=$code content_type=$ctype"
fi

skip_case "TC-6.2 social preview" "MANUAL after deploy: paste https://bimlesh.dev into Slack/X/LinkedIn debugger"

echo ""

# ---------------------------------------------------------------------------
# TC-7 Studio + admin redirect
# ---------------------------------------------------------------------------
echo "## TC-7 Studio / admin"

redir=$(curl -s -o /dev/null -w '%{redirect_url}' "$BASE/admin")
if echo "$redir" | grep -q '/studio'; then
  pass_case "TC-7.1 /admin redirects to /studio"
else
  fail_case "TC-7.1 /admin redirects to /studio" "redirect_url=$redir"
fi

code=$(http_code "$BASE/studio" /tmp/tc7-studio.html)
if [[ "$code" == "200" ]] || [[ "$code" == "307" ]] || [[ "$code" == "308" ]]; then
  pass_case "TC-7.2 /studio responds ($code)"
else
  fail_case "TC-7.2 /studio responds" "got $code"
fi

robots=$(curl -s "$BASE/robots.txt")
if echo "$robots" | grep -q '/studio/' && echo "$robots" | grep -q '/admin/'; then
  pass_case "TC-7.3 robots disallow studio+admin"
else
  fail_case "TC-7.3 robots disallow studio+admin" "unexpected robots.txt"
fi

skip_case "TC-7.4 Studio edit flow" "MANUAL: sign in at /studio, edit a post, save"

echo ""
echo "=== Summary: $pass passed, $fail failed, $skip skipped (manual) ==="
if [[ "$fail" -gt 0 ]]; then exit 1; fi
exit 0
