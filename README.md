# Trust Agro Consult

Agricultural consulting and training website for Trust Agro Consult P.L.C, Ethiopia.

## Live
https://trust-agro-consult.vercel.app/blog

## Stack
- Frontend: Next.js 14, shadcn/ui, Tailwind CSS, TanStack Query — Vercel
- Backend: Django 5, Django REST Framework, PostgreSQL — Render.com
- Media: Cloudinary
- Deployment: Vercel + Render (both free tier)

## Local Development

### Backend
  cd backend
  python -m venv venv
  venv\Scripts\activate
  pip install -r requirements.txt
  cp .env.example .env
  python manage.py migrate
  python manage.py seed_services
  python manage.py runserver

### Frontend
  cd frontend
  npm install
  npm run dev
