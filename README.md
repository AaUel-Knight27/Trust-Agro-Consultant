# Trust Agro Consult

Agricultural consulting website rebuild.

## Stack

- Frontend: Next.js 14, shadcn/ui, Tailwind CSS, TanStack Query
- Backend: Django 5, Django REST Framework, SQLite (dev)

## Development

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_services
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend API: http://127.0.0.1:8000
- Admin panel: http://127.0.0.1:8000/admin
