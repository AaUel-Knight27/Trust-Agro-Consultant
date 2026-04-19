# Deployment Guide

## Architecture
  Next.js Frontend  →  Vercel        (free)
  Django Backend    →  Render.com    (free)
  PostgreSQL        →  Render.com    (free, auto-attached)
  Media Files       →  Cloudinary    (free tier)

---

## Part 1 — Deploy Django Backend to Render.com

### Step 1: Push to GitHub
Make sure all backend changes are committed and pushed.

### Step 2: Create Web Service on Render
1. Go to render.com → New → Web Service
2. Connect your GitHub repo
3. Set Root Directory to: backend
4. Runtime: Python 3
5. Build Command: ./build.sh
6. Start Command: gunicorn config.wsgi:application --bind 0.0.0.0:$PORT

### Step 3: Add Environment Variables in Render Dashboard
Go to Environment tab and add each one:
  SECRET_KEY              → generate a random 50-char string
  DEBUG                   → False
  ALLOWED_HOSTS           → your-app.onrender.com
  CORS_ALLOWED_ORIGINS    → https://your-app.vercel.app
  CLOUDINARY_CLOUD_NAME   → (from Cloudinary dashboard)
  CLOUDINARY_API_KEY      → (from Cloudinary dashboard)
  CLOUDINARY_API_SECRET   → (from Cloudinary dashboard)

### Step 4: Add PostgreSQL Database
1. Render Dashboard → New → PostgreSQL
2. Name it: trust-agro-db
3. Click Connect on your web service → link the database
4. Render auto-injects DATABASE_URL — no manual copy needed

### Step 5: Deploy
Click Deploy. Watch build logs.
build.sh will run: pip install → collectstatic → migrate → seed_services

### Step 6: Create Superuser
After deploy succeeds:
Render Dashboard → your web service → Shell tab → run:
  python manage.py createsuperuser

### Step 7: Test your backend
  https://your-app.onrender.com/health/          → should return {"status":"ok"}
  https://your-app.onrender.com/api/services/    → should return 6 services as JSON
  https://your-app.onrender.com/api/blog/posts/  → should return empty array
  https://your-app.onrender.com/admin/           → should show Django admin login

---

## Part 2 — Deploy Next.js Frontend to Vercel

### Step 1: Push to GitHub
Make sure all frontend changes are committed and pushed.

### Step 2: Import Project on Vercel
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Set Root Directory to: frontend
4. Framework Preset: Next.js (auto-detected)

### Step 3: Add Environment Variables in Vercel Dashboard
  NEXT_PUBLIC_API_URL     → https://your-backend.onrender.com
  NEXT_PUBLIC_SITE_URL    → https://your-app.vercel.app

### Step 4: Deploy
Click Deploy. Vercel builds and deploys automatically.
Every future git push to main auto-redeploys.

### Step 5: Test your frontend
  https://your-app.vercel.app                    → homepage loads
  https://your-app.vercel.app/services           → services load from Django API
  https://your-app.vercel.app/blog               → blog loads
  https://your-app.vercel.app/contact            → contact form works

---

## Part 3 — Point Your Subdomain (Optional)

In your domain registrar (Namecheap, Cloudflare, etc):

For frontend (Vercel):
  Type: CNAME
  Name: app (or www)
  Value: cname.vercel-dns.com

For backend (Render):
  Type: CNAME
  Name: api
  Value: your-app.onrender.com

Then in Vercel: Settings → Domains → Add your subdomain
Then in Render: Settings → Custom Domains → Add your subdomain

---

## Part 4 — Update CORS After Custom Domain

Once your subdomains are live, update in Render environment variables:
  ALLOWED_HOSTS    → your-backend.onrender.com,api.yourdomain.com
  CORS_ALLOWED_ORIGINS → https://your-app.vercel.app,https://app.yourdomain.com

Render will auto-redeploy.
