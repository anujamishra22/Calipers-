# Security

## Production checklist

1. Set `NODE_ENV=production`.
2. Use strong random `JWT_SECRET` and `COOKIE_SECRET` (32+ characters).
3. Set `CORS_ORIGIN` to your real site URL only (not `*`).
4. Change `ADMIN_PASSWORD` from any default; never commit `.env` or `*.db` files.
5. Run the site over HTTPS so secure cookies and HSTS apply.
6. If `backend/prisma/prisma/dev.db` was ever committed, remove it from git history and rotate secrets.

## Features

- Admin CSRF tokens on all POST forms and upload API
- Contact form honeypot + rate limits
- Upload allowlist (JPEG/PNG/GIF/WebP) with magic-byte verification
- Blog HTML sanitized with DOMPurify on the public site
- JWT in httpOnly cookies; `SameSite=strict` in production

## Reporting

Email security issues to your team contact (e.g. hello@caliper.com).
