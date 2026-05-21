# Caliper backend

Express + TypeScript + Prisma (SQLite). REST API for blogs, articles, case studies, contact info, and contact leads. Includes a minimal EJS admin panel at `/admin` with contact lead storage and CSV export.

## Setup

```bash
cd backend
cp .env.example .env   # Windows: copy .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

For production-style migrations you can use `npx prisma migrate dev --name init` after `db push` is no longer needed (SQLite JSON columns are stored as stringified JSON in this project for compatibility).

- API: `http://localhost:4000/api`
- Admin: `http://localhost:4000/admin` (login with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`)
- Contact leads: `/admin/contact/submissions` — filter by status, export CSV at `/admin/contact/leads/export.csv`
- Public contact form posts to `POST /api/contact` (stored in SQLite)

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Watch mode with `tsx` |
| `npm run build` | Compile TS + copy admin EJS/assets to `dist/` |
| `npm start` | Run compiled server |
| `npm run db:migrate` | Prisma migrate (optional; see setup above) |
| `npm run db:seed` | Seed admin + content from parent `src/data/*` |
| `npm run db:studio` | Prisma Studio |

## Production notes

- Set `NODE_ENV=production`, strong `JWT_SECRET` / `COOKIE_SECRET`, and `CORS_ORIGIN` to your frontend origin.
- The auth cookie uses `secure: true` when `NODE_ENV=production` (HTTPS required).
